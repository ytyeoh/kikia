class Booking < ActiveRecord::Base
  belongs_to :customer, class_name: "User"
  belongs_to :listing
end
