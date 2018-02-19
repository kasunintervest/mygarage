class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def after_sign_in_path_for(resource)
    admin_dashboard_url
  end

  private
  def after_sign_out_path_for(resource_or_scope)
    if resource_or_scope == :admin_user
      new_admin_user_session_path
    else
      root_path
    end
  end
end
