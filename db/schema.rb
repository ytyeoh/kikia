# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170805035354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blogs", force: :cascade do |t|
    t.string   "title"
    t.text     "desc"
    t.integer  "user_id"
    t.integer  "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookings", force: :cascade do |t|
    t.float    "amount"
    t.integer  "user_id"
    t.integer  "listing_id"
    t.integer  "status"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.time     "time"
    t.datetime "begin_time"
    t.datetime "end_time"
    t.integer  "driver_id"
    t.integer  "payment_type"
  end

  add_index "bookings", ["driver_id"], name: "index_bookings_on_driver_id", using: :btree
  add_index "bookings", ["listing_id"], name: "index_bookings_on_listing_id", using: :btree
  add_index "bookings", ["user_id"], name: "index_bookings_on_user_id", using: :btree

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.string   "data_fingerprint"
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "ckeditor_assets", ["type"], name: "index_ckeditor_assets_on_type", using: :btree

  create_table "credit_records", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "credit"
    t.integer  "balance"
    t.integer  "item"
    t.integer  "listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "credit_records", ["listing_id"], name: "index_credit_records_on_listing_id", using: :btree
  add_index "credit_records", ["user_id"], name: "index_credit_records_on_user_id", using: :btree

  create_table "favorite_listings", force: :cascade do |t|
    t.integer "user_id"
    t.integer "listing_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.integer  "booking_id"
    t.integer  "status"
    t.decimal  "amount",         precision: 20, scale: 2
    t.integer  "payment_method"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "listings", force: :cascade do |t|
    t.string   "name"
    t.string   "desc"
    t.integer  "user_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "address"
    t.integer  "token",              default: 0
    t.integer  "coin",               default: 0
    t.datetime "published_at"
    t.integer  "view",               default: 0
    t.string   "search_tags",        default: [],              array: true
    t.string   "city"
    t.string   "country"
    t.string   "state"
    t.string   "postal_code"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.boolean  "imove_in"
    t.integer  "price"
    t.integer  "bedroom"
    t.integer  "bathroom"
    t.integer  "parking"
    t.integer  "furnished"
    t.integer  "area"
    t.integer  "property"
    t.boolean  "hide"
    t.text     "schedule"
    t.integer  "capacity"
    t.integer  "package"
    t.integer  "time_duration"
    t.time     "pick_up_time"
    t.boolean  "active"
  end

  add_index "listings", ["user_id"], name: "index_listings_on_user_id", using: :btree

  create_table "pictures", force: :cascade do |t|
    t.integer  "listing_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "booking_id"
    t.string   "comment"
    t.integer  "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "listing_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "user_credits", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "credits"
    t.integer  "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "identity_card"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "stage"
    t.integer  "credit"
    t.integer  "braintree_customer_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "contact"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "vehicle_images", force: :cascade do |t|
    t.integer  "vehicle_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "vehicle_images", ["vehicle_id"], name: "index_vehicle_images_on_vehicle_id", using: :btree

  create_table "vehicles", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "seat"
    t.string   "model"
    t.integer  "brand"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "vehicles", ["user_id"], name: "index_vehicles_on_user_id", using: :btree

end
