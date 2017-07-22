class AddStageToUser < ActiveRecord::Migration
  def change
    add_column :users, :stage, :string
    
  end
end
