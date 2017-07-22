class FavoriteListing < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  paginates_per 10
end