class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  belongs_to :driver, class_name: "User"
  has_one :invoice
  has_many :reviews

  enum payment_type: {'paypal_account': 1, 'credit_card': 2}
  enum status: {'active': 1, 'complete': 2, 'cancel': 3, 'refund': 4 }
end
