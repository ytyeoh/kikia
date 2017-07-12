class CreateVehicleImages < ActiveRecord::Migration
  def change
    create_table :vehicle_images do |t|
      t.integer :vehicle_id
      t.attachment :image

      t.timestamps null: false
    end
  end
end
