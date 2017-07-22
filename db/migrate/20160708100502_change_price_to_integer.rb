class ChangePriceToInteger < ActiveRecord::Migration
  def change
    remove_column :listings, :price,  :string
    add_column :listings, :price,  :integer
  end
end
