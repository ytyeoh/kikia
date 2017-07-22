class AddIndexToListingOwner < ActiveRecord::Migration
  def change
     add_index :listings, :user_id
  end
end
