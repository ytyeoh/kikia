class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception




  def json_success(status: 200, success: [])
    head status: status and return if success.empty?

    render json: success.to_json, status: status
  end


end
  