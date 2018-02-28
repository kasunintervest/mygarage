class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  prepend_before_action :require_no_authentication, only: [:new, :create, :cancel, :update]
  prepend_before_action :authenticate_scope!, only: [:edit, :destroy]
  before_action :authenticate_user_from_token!, :except => [:create]

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      resource.add_role :customer
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  def update
    token = params[:user_token].presence
    user = User.find_by_authentication_token(token)

    user.update_attributes(user_params)
    respond_with user, json: user
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password)
    end

    def sign_up_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def account_update_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
    end

    def authenticate_user_from_token!
      user_email = params[:user_email].presence
      user       = user_email && User.find_by_email(user_email)

      if user && Devise.secure_compare(user.authentication_token, params[:user_token])
        sign_in user, store: false
      else
        head(:unauthorized)
      end
    end
end
