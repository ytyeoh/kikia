json.array!(@blogs) do |blog|
  json.extract! blog, :id, :title, :desc, :user_id, :category
  json.url blog_url(blog, format: :json)
end
