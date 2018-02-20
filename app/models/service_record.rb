class ServiceRecord < ApplicationRecord
  belongs_to :vehicle

  has_attached_file :attachment, styles: { medium: '600x600>', thumb: '200x200>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :attachment, content_type: /\Aimage\/.*\z/
  validates_attachment_size :attachment, :in => 0.megabytes..10.megabytes,  message: 'is too large, try less than 10Mb file'
  validates :service_type_id, presence: true
  validates :service_date, presence: true

  def attachment_url
    if self.attachment_file_name
      {:original => self.attachment.url(:original), :medium => self.attachment.url(:medium), :thumb => self.attachment.url(:thumb)}
    end
  end
end
