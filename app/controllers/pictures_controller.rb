class PicturesController < ApplicationController

  def destroy
    @picture = Picture.find(params[:id])
    if @picture.destroy
      flash[:notice] = 'Image delete'
      return json_success(status: 201, success: 'Image Delete') 
    else
     return json_error(status: 422, errors: 'unable to delete')
    end
  end
end