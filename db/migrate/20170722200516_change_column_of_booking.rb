class ChangeColumnOfBooking < ActiveRecord::Migration
  def change
    rename_column :bookings, :customer_id, :user_id
  end
end
