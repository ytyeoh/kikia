class Picture < ActiveRecord::Migration
  def change 
    create_table :pictures do |t|
      t.integer :listing_id
    end
  end
end
