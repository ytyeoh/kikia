class AddCapacityToListing < ActiveRecord::Migration
  def change
    add_column :listings, :capacity, :integer
    add_column :listings, :package, :integer
    add_column :listings, :time_duration, :integer
    add_column :listings, :pick_up_time, :time
    add_column :listings, :active, :boolean
  end
end
