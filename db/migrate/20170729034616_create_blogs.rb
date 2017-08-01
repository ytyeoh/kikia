class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :desc
      t.integer :user_id
      t.integer :category

      t.timestamps null: false
    end
  end
end
