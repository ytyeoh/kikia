class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  belongs_to :driver, class_name: "User"
end
