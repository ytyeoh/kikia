class Review < ActiveRecord::Base
	belongs_to :user
	belongs_to :boking
  belongs_to :listing
end
