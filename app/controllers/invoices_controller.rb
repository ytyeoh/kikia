class InvoicesController < ApplicationController
  before_action :set_invoice, only: [:show, :edit, :update, :destroy]
  before_action :sanitize_page_params, only: [:update]
  def show
    respond_to do |format|
      format.html
      format.pdf do
        render :pdf => "show",
               :template => "invoices/show.pdf.erb",
               :layout => "show.html.erb"
      end
    end
  end

  def index
    ids = current_user.bookings.collect(&:id)
    @invoices = Invoice.where(booking_id: ids)
  end

  def update
    if params[:invoice][:status] == 4
      respond_to do |format|
        if @invoice.update(invoice_params)
          format.html { redirect_to invoices_path, notice: 'Booking was successfully updated.' }
          format.json { render :show, status: :ok, location: @blog }
        else
          format.html { redirect_to invoices_path }
          format.json { render json: @invoice.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.html { redirect_to invoices_path, notice: 'Booking was fail to updated try again.'}
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end


  private
  def set_invoice
    @invoice = Invoice.find(params[:id])
  end

  def sanitize_page_params
    params[:invoice][:status] = params[:invoice][:status].to_i

  end

  def invoice_params
    params.require(:invoice).permit(:status)
  end
end