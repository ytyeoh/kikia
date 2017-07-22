class RegistrationsController < Devise::RegistrationsController

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :identity_card, :stage, :image, :password, :password_confirmation)
  end
end