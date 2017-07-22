class CreditRecord < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  enum item: { auto_bumb: 1, highlights: 2 }
end
