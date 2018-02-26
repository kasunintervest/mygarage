class AdminUser < ApplicationRecord
  self.table_name = 'users'
  has_and_belongs_to_many :roles, join_table: 'users_roles', :foreign_key => 'user_id'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable, :recoverable

  def active_for_authentication?
    super && self.is_admin # i.e. super && self.is_active
  end

  def inactive_message
    'Invalid login'
  end

  def is_admin
    role = self.roles.first
    true if role && role.name == 'admin'
  end
end
