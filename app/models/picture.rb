class Picture < ApplicationRecord
  belongs_to :vehicle
  accepts_nested_attributes_for :vehicle

  has_attached_file :image, styles: { medium: '600x600>', thumb: '200x200>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates_attachment_size :image, :in => 0.megabytes..10.megabytes,  message: 'is too large, try less than 10Mb file'

end
