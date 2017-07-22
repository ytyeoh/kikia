class AddHideAdsToListing < ActiveRecord::Migration
  def change
    add_column :listings, :hide, :boolean
  end
end
