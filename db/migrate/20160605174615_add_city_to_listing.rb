class AddCityToListing < ActiveRecord::Migration
  def change
    add_column :listings, :city, :string
    add_column :listings, :country, :string
    add_column :listings, :state, :string
    add_column :listings, :postal_code, :string
  end
end
