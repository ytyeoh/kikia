class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.float :amount
      t.integer :customer_id
      t.integer :listing_id
      t.integer :status
      t.timestamps :begin_time
      t.timestamps :end_time
      t.timestamps :time
      t.timestamps null: false
    end
    add_index :bookings, :customer_id
    add_index :bookings, :listing_id
  end
end
