class ServiceType < ApplicationRecord
  self.per_page = 10
  validates :name, presence: true
end
