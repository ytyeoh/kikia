class ListingsController < ApplicationController
  before_action :set_listing, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :create]
  before_action :braintree_token, only: [:booking]
  skip_before_action :verify_authenticity_token, only: [:booking]

  # GET /listings
  # GET /listings.json

  def braintree_token
    @braintree_token = generate_client_token
  end

  def index
    if params[:query].present?
      @listingss = Listing.search params[:query], fields: [:search_tags], where: {imove_in: params[:imove_in], price: {gte: params[:lower], lte: params[:higher]}}, order: {published_at: :desc,}
      @listings = Kaminari.paginate_array(@listingss).page(params[:listing]).per(10)
    else
      @listings = Listing.all.order("published_at DESC").page(params[:listing]).per(10)
    end
  end

  # GET /listings/1
  # GET /listings/1.json
  def show
    @braintree_token = generate_client_token
    @credit = CreditRecord.new
    @listing = Listing.find(params[:id])
    @listing.search_tags << 'room rent' << 'house rent'
    @hash = Gmaps4rails.build_markers(@listing) do |listing, marker|
      marker.lat listing.latitude
      marker.lng listing.longitude
    end
    @listings = Listing.where(city: @listing.city).order("price ASC").first(6)
    @listing.view += 1
    if current_user
      if @listing.user.id == current_user.id
        @listing.view -= 1
      end
    end
    @listing.save
  end

  # GET /listings/new
  def new
    @listing = Listing.new
  end

  # GET /listings/1/edit
  def edit
  end

  # POST /listings
  # POST /listings.json
  def create
    @listing = Listing.new(listing_params)
    @listing.user_id = current_user.id
    @listing.published_at = DateTime.now
    duration = params[:listing][:duration].to_i
    @listing.capacity = current_user.vehicle.seat
    begin_time = DateTime.parse(params[:listing][:begin_time])
    time = params[:listing][:time].scan(/\d+/).first
    # if time[0] == '0'
    #   time = time.slice!(1)
    # end

    @listing.schedule = IceCube::Schedule.new(begin_time, duration: duration.hours)
    @listing.schedule.add_recurrence_rule IceCube::Rule.daily.hour_of_day(params[:listing][:time].scan(/\d+/).first.to_i)

    respond_to do |format|
      if @listing.save
        if params[:images]
          @uploaded_images = params[:images]
          @uploaded_images.each { |image, object|
            @listing.pictures.create(image: object)
          }
        end
        @listing.search_tags << @listing.city << @listing.state << @listing.postal_code << @listing.country
        @listing.save
        flash[:notice] = "new listing"
        format.html { redirect_to @listing, notice: 'Listing was successfully created.' }
        format.json { render :show, status: :created, location: @listing }
      else
        format.html { render :new }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /listings/1
  # PATCH/PUT /listings/1.json
  def update
    respond_to do |format|
      if @listing.update(listing_params)
        @listing.search_tags= []
        @listing.search_tags << @listing.city << @listing.state << @listing.postal_code << @listing.country
        @listing.save
        if params[:images]
          @uploaded_images = params[:images]
          @uploaded_images.each { |image, object|
            @listing.pictures.create(image: object)
          }
        end
        if params[:delete_images]
          params[:delete_images].each { |id|
            Picture.find(id).destroy
          }
        end
        flash[:notice] = "update done"
        format.html { redirect_to @listing, notice: 'Listing was successfully updated.' }
        format.json { render :js => "window.location='/listings/#{@listing.id}'" }
      else
        format.html { render :edit }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /listings/1
  # DELETE /listings/1.json
  def destroy
    @listing.destroy
    respond_to do |format|
      format.html { redirect_to listings_url, notice: 'Listing was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def autocomplete
    render json: Listing.search(params[:query], autocomplete: true, limit: 10).map(&:city)
  end

  def booking
    @result = Braintree::Transaction.sale(amount: params[:amount],payment_method_nonce: params[:payment_method_nonce])
byebug
    if @result.success?
      current_user.update(braintree_customer_id: @result.transaction.customer_details.id, credit: new_credit) unless current_user.has_payment_info?
      current_user.save
      
      respond_to do |format|
        if current_user.book! @listing, time_start: params[:time_start], time_end: (params[:time_start]+params[:time])
          format.html { redirect_to listings_path(@listing), notice: 'You was successfully purchase deal.' }
          format.json { render :show, status: :created, location: @listing }
        else
          format.html { render :show }
          format.json { render json: @credit.errors, status: :unprocessable_entity }
        end
      end
    else
      flash[:alert] = "Something went wrong while processing your transaction. Please try again!"
      gon.client_token = generate_client_token
      redirect_to :back
    end
  end

  def owner
    @listings = Listing.where(user_id: current_user.id).order("published_at DESC").page params[:listing]
    @hash = Gmaps4rails.build_markers(@listings) do |listing, marker|
      marker.lat listing.latitude
      marker.lng listing.longitude
    end
  end

  def fav
    @listings = current_user.favorite_listings.page params[:listing]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def generate_client_token
      if current_user
        if current_user.has_payment_info?
          Braintree::ClientToken.generate
        else
          Braintree::ClientToken.generate
        end
      end
    end

    def set_listing
      @listing = Listing.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def listing_params
      params.require(:listing).permit(:name, :desc, :price, :address, :latitude, :longitude, :token, :coin, :published_at, :images, :active, :hide, :package, :capacity)
    end
end
