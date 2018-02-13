class Vehicle < ApplicationRecord
  has_many :pictures, :dependent => :destroy
  accepts_nested_attributes_for :pictures

  def image
    if self.pictures.first
      picture = self.pictures.where("image_file_name <> ''").order('id DESC').first
      {:id => picture.id, :original => picture.image.url(:original), :medium => picture.image.url(:medium), :thumb => picture.image.url(:thumb)}
    end
  end

  validates :name, presence: true
  validates :make, presence: true
  validates :model, presence: true
  validates :year, presence: true
end
