class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  # GET /users
  # GET /users.json
  def index
    if current_user.is_admin?
      @users = User.all
    else
      @users = current_user
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @review = Review.new
    @reviews = Review.where(user_id:params[:id])
    @user_credit = UserCredit.where(user_id: current_user)
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    @user.vehicle = Vehicle.new
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update_attributes(user_params)
        if params[:images]
          @uploaded_images = params[:images]
          @uploaded_images.each { |image, object|
            @user.vehicle.vehicle_images.create(image: object)
          }
        end
        if params[:delete_images]
          params[:delete_images].each { |id|
            VehicleImage.find(id).destroy
          }
        end
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def credit
    @user = current_user
    @credits = current_user.credit_records.order('created_at DESC')
    @braintree_token = generate_client_token
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def generate_client_token
      if current_user.has_payment_info?
        Braintree::ClientToken.generate(customer_id: current_user.braintree_customer_id)
      else
        Braintree::ClientToken.generate
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :identity_card, :stage, :image, :contact, vehicle_attributes:[:id, :brand, :model, :seat, images:[]])
    end
end
