class Admin::DashboardController < ApplicationController
  before_action :authenticate_admin_user!

  def index
    @user = AdminUser.find(current_admin_user.id)
  end
end
