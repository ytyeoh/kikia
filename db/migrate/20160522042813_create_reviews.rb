class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :rater_id
      t.string :comment
      t.integer :rating

      t.timestamps null: false
    end
  end
end
