class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.integer :user_id
      t.integer :seat
      t.string :model
      t.integer :brand
      t.timestamps null: false
    end
    add_index :vehicles, :user_id
  end
end
