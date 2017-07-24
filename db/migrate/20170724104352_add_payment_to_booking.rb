class AddPaymentToBooking < ActiveRecord::Migration
  def change
    add_column :bookings, :payment_type, :integer
  end
end
