class HomeController < ApplicationController
	
	def index
    @drivers = Listing.first(5)

	end
end
