json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :identity_card
  json.url user_url(user, format: :json)
end
