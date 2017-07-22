class FavoriteListingsController < ApplicationController
  def create
    @listing = Listing.find(params[:listing_id])
    if FavoriteListing.create(user_id: current_user.id, listing_id: params[:listing_id])
      flash[:notice] = 'You successfully favourite.'
      return json_success(status: 201, success: 'You successfully favourite.')
    else
     return json_error(status: 422, errors: 'unable to unlike')
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @favorite = current_user.favorite_listings.find_by(listing_id: params[:id])
    if @favorite.destroy
      flash[:notice] = 'You just unfavourite'
      return json_success(status: 201, success: 'You just unfavourite') 
    else
     return json_error(status: 422, errors: 'unable to unlike')
    end
  end
end