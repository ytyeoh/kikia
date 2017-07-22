class AddInstantMoveInToListing < ActiveRecord::Migration
  def change
    add_column :listings, :imove_in, :boolean
  end
end
