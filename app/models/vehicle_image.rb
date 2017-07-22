class VehicleImage < ActiveRecord::Base
  has_attached_file :image,
    :styles => {
      :thumb => "60x60#",
      :medium => "200x200#"
  }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/x
  belongs_to :vehicle
end
