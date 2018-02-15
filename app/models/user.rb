class User < ApplicationRecord
  rolify
  acts_as_token_authenticatable

  # Include default devise modules. Others available are:
  # :recoverable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable

  validates_presence_of :first_name
  validates_presence_of :last_name

  after_create :assign_default_role

  def assign_default_role
    self.add_role(:customer) if self.roles.blank?
  end
end
