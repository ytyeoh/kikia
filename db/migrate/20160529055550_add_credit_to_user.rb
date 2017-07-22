class AddCreditToUser < ActiveRecord::Migration
  def change
    add_column :users, :credit, :integer, delault: 0
  end
end
