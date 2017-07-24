class Booking < ActiveRecord::Base
  belongs_to :user
  belongs_to :listing
  belongs_to :driver, class_name: "User"

  enum payment_type: {'paypal_account': 1, 'credit_card': 2}
end
