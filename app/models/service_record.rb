class ServiceRecord < ApplicationRecord
  validates :type, presence: true
  validates :date, presence: true
end
