class AddIndexToCreditRecords < ActiveRecord::Migration
  def change
    add_index :credit_records, :user_id
    add_index :credit_records, :listing_id
  end
end
