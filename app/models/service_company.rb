class ServiceCompany < ApplicationRecord
  self.per_page = 10
  validates :name, presence: true
end
