class CreateUserCredits < ActiveRecord::Migration
  def change
    create_table :user_credits do |t|
      t.integer :user_id
      t.integer :credits
      t.integer :amount

      t.timestamps null: false
    end
  end
end
