class AddTimeToBooking < ActiveRecord::Migration
  def change
    add_column :bookings, :time, :time
    add_column :bookings, :begin_time, :datetime
    add_column :bookings, :end_time, :datetime

  end
end
