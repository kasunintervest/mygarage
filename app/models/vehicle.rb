class Vehicle < ApplicationRecord
  #has_many :pictures, ->(vehicle){where('pictures.resource_type=1 AND resource_id=?', vehicle.id)}
  has_many :pictures, :dependent => :destroy
  has_many :service_records, :dependent => :destroy
  accepts_nested_attributes_for :service_records

  def image
    picture = self.pictures.where("image_file_name <> ''").order('id DESC').first
    if picture
      {:id => picture.id, :original => picture.image.url(:original), :medium => picture.image.url(:medium), :thumb => picture.image.url(:thumb)}
    end
  end

  validates :name, presence: true
  validates :make, presence: true
  validates :model, presence: true
  validates :year, presence: true

  self.per_page = 10
end
