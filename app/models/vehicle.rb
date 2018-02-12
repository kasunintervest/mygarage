class Vehicle < ApplicationRecord
  validates :name, presence: true
  validates :make, presence: true
  validates :model, presence: true
  validates :year, presence: true
end
