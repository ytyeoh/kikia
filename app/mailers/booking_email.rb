class BookingEmail < ApplicationMailer
  default from: 'notifications@example.com'
 
  def payment_email(user, booking, listing, invoice)
    @user = user
    @booking = booking
    @listing = listing
    @invoice = invoice
    mail(to: @user.email, subject: 'Thank For Support Kikia - PO' + @booking.id.to_s )
  end

  def notification(user, booking, listing, invoice)
    @user = user
    @booking = booking
    @listing = listing
    @invoice = invoice
    @admin = 'ytyeoh@me.com'
    mail(to: @listing.user.email, bcc: @admin, subject: 'Kikia Order - PO' + @booking.id.to_s)
  end
end
