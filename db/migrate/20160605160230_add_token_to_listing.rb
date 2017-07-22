class AddTokenToListing < ActiveRecord::Migration
  def change
    add_column :listings, :token, :integer, :default => 0
    add_column :listings, :coin, :integer, :default => 0
    add_column :listings, :published_at, :datetime
    add_column :listings, :view, :integer, :default => 0
    add_column :listings, :search_tags, :string, :array => true, default: []
  end
end
