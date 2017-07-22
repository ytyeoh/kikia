class CreateVehicleImages < ActiveRecord::Migration
  def change
    create_table :vehicle_images do |t|
      t.integer :vehicle_id
      t.attachment :image

      t.timestamps null: false
    end
    add_index :vehicle_images, :vehicle_id
  end
end
