class UserCreditsController < ApplicationController
	skip_before_action :verify_authenticity_token
	before_action :set_credit, only: [:show, :edit, :update, :destroy]

  def new
    @credit = UserCredit.new
    gon.client_token = generate_client_token
  end

  def show
    respond_to do |format|
      format.html
      format.pdf do
        render :pdf => "show",
               :template => "user_credits/show.pdf.erb",
               :layout => "show.html.erb"
      end
    end
  end

  def create
    @credit = UserCredit.new(credit_params)
    @credit.user_id = current_user.id
    case @credit.amount
    when 20
      @credit.credits = 30
    when 50
      @credit.credits = 70
    when 80
      @credit.credits = 90
    end
    # @credit.amount = params[:user_credit][:credits]
    @result = Braintree::Transaction.sale(amount: @credit.amount,payment_method_nonce: params[:payment_method_nonce])
    if @result.success?
      new_credit = current_user.credit + @credit.credits
      current_user.update(braintree_customer_id: @result.transaction.customer_details.id, credit: new_credit) unless current_user.has_payment_info?
      current_user.save
      respond_to do |format|
        if @credit.save
          format.html { redirect_to credit_users_path(:anchor => "purchases"), notice: 'You was successfully purchase credits.' }
          format.json { render :show, status: :created, location: @credit }
        else
          format.html { render :new }
          format.json { render json: @credit.errors, status: :unprocessable_entity }
        end
      end
    else
      flash[:alert] = "Something went wrong while processing your transaction. Please try again!"
      gon.client_token = generate_client_token
      redirect_to :back
    end
  end

  def index
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_credit
      @credit = UserCredit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def credit_params
      params.require(:user_credit).permit(:user_id, :credits, :amount)
    end
end
