class Listing < ActiveRecord::Base
	belongs_to :user
	has_many :favorite_listings
	has_many :credit_records
	has_many :pictures, :dependent => :destroy
	has_many :bookings
	searchkick autocomplete: ['city']
	paginates_per 10
	# attr_accessible :address, :latitude, :longitude
	geocoded_by :address
	# has_attached_file :image,
	# 	:styles => {
	#       :thumb => "100x100#",
	#       :small  => "150x150>",
	#       :medium => "200x200" }
	# validates_attachment :image,
 #                     content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }


	
	enum property: { landed: 1, 'High Rise': 2, other: 3 }
	enum furnished: { fully: 1, partialy: 2, basic: 3 }
end
