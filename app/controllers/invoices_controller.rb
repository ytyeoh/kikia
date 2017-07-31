class InvoicesController < ApplicationController
  def show
    @invoice = Invoice.find(params[:id])
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
end
