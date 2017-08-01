# Preview all emails at http://localhost:3000/rails/mailers/booking_email
class BookingEmailPreview < ActionMailer::Preview
  def payment_email
    BookingEmail.payment_email(User.last, Booking.last, Listing.last, Invoice.last)
  end

  def notification
    BookingEmail.notification(Listing.last.user, Booking.last, Listing.last, Invoice.last)
  end

end
