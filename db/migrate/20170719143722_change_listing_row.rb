class ChangeListingRow < ActiveRecord::Migration
  def change
    rename_column :listings, :imove_in, :active
    rename_column :listings, :type, :package
    remove_column :listings, :area ,:integer
    remove_column :listings, :bedroom,:integer
    remove_column :listings, :bathroom,:integer
    remove_column :listings, :parking,:integer
    remove_column :listings, :furnished,:integer
    remove_column :listings, :property,:integer

  end
end
