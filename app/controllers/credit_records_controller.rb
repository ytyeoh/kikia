class CreditRecordsController < ApplicationController
  def create
    @user = current_user
    @listing = Listing.find(params[:credit_record][:listing_id].to_i)
    if @user.credit >=7
      @user.credit -= 7
      @credit = CreditRecord.new(user_id: current_user.id, credit: current_user.credit, balance: (current_user.credit-7), listing_id: params[:credit_record][:listing_id])
      
      @listing.published_at = Time.now
      case params[:credit_record][:type]
      when 'coin'
        @listing.coin += 7
        @credit.item = 2
      when 'token'
        @listing.token += 7
        @credit.item = 1
      end
      @listing.save
      @credit.save
      @user.save
      respond_to do |format|
        flash[:notice] = 'You successfully Update your lsiting'
        format.html { redirect_to owner_listings_path, notice: 'order succesful' }
      end
    else
      respond_to do |format|
        flash[:notice] = 'please top up credit to continue'
        format.html { redirect_to listing_path(@listing.id), notice: 'Fail to order' }
      end
    end
  end

  def show
    @credit = CreditRecord.find(params[:id])
    respond_to do |format|
      format.html
      format.pdf do
        render :pdf => "show",
               :template => "credit_record/show.pdf.erb",
               :layout => "show.html.erb"
      end
    end
  end
end
