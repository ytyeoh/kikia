json.array!(@reviews) do |review|
  json.extract! review, :id, :user_id, :rater_id, :comment, :rating
  json.url review_url(review, format: :json)
end
