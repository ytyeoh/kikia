class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.integer :booking_id
      t.integer :status
      t.decimal :amount, precision: 20, scale: 2
      t.integer :payment_method

      t.timestamps null: false
    end
  end
end
