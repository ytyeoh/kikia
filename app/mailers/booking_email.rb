class BookingEmail < ApplicationMailer
  default from: 'notifications@example.com'
 
  def payment_email(user, booking, listing, invoice)
    @user = user
    @booking = booking
    @listing = listing
    @invoice = invoice
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Thank For Support Kikia')
  end
end
