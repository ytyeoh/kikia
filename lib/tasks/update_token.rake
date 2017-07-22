namespace :token do
  desc "update listing token status"
  task :token_listing => :environment do
    Listing.where('token >= 1', 'coin >=1').each do |listing|
      unless listing.published_at > Time.now-1.day
        listing.token -= 1
        listing.token = 0 if listing.token = -1
        listing.coin -= 1
        listing.coin = 0 if listing.coin = -1
        listing.published_at += 1.day
        listing.save
      end 
    end
  end
end
