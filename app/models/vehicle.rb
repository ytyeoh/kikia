class Vehicle < ActiveRecord::Base
  belongs_to :user
  has_many :vehicle_images, :dependent => :destroy
end
