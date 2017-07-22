class CreateCreditRecords < ActiveRecord::Migration
  def change
    create_table :credit_records do |t|
      t.integer :user_id
      t.integer :credit
      t.integer :balance
      t.integer :item
      t.integer :credit
      t.integer :listing_id

      t.timestamps null: false
    end
  end
end
