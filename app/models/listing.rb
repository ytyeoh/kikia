class Listing < ActiveRecord::Base
	belongs_to :user
	has_many :favorite_listings
	has_many :credit_records
	has_many :bookings
	has_many :reviews
	has_many :pictures, :dependent => :destroy
	searchkick autocomplete: ['city']
	paginates_per 10
	# attr_accessible :address, :latitude, :longitude
	# has_attached_file :image,
	# 	:styles => {
	#       :thumb => "100x100#",
	#       :small  => "150x150>",
	#       :medium => "200x200" }
	# validates_attachment :image,
 #                     content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }

 attr_accessor :time, :begin_time, :duration
	enum package: {'Car Hire With Driver': 1, 'Airport Transfer': 2}
	enum property: { landed: 1, 'High Rise': 2, other: 3 }
	enum furnished: { fully: 1, partialy: 2, basic: 3 }
end
