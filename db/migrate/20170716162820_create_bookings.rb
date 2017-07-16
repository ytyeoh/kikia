class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.float :amount
      t.integer :owner_id
      t.integer :customer_id
      t.integer :listing_id
      t.timestamps :begin_time
      t.timestamps :end_time
      t.timestamps null: false
    end
  end
end
