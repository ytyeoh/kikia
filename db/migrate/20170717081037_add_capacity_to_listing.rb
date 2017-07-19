class AddCapacityToListing < ActiveRecord::Migration
  def change
    add_column :listings, :capacity, :integer
    add_column :listings, :type, :integer
    add_column :listings, :schedule, :text
  end
end
