class Invoice < ActiveRecord::Base
  belongs_to :booking
  enum payment_method: {'paypal_account': 1, 'credit_card': 2}
  enum status: {'paid': 1, 'unpaid': 2, 'cancel': 3, 'refund': 4 }
end
