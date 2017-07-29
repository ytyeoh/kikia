class Blog < ActiveRecord::Base
  belongs_to :user
  enum category: {'news': 1, 'blog': 2 }
end
