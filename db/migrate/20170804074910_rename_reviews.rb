class RenameReviews < ActiveRecord::Migration
  def change
    rename_column :reviews, :rater_id, :booking_id
  end
end
