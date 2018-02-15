class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  prepend_before_action :require_no_authentication, only: [:new, :create, :cancel, :update]
  prepend_before_action :authenticate_scope!, only: [:edit, :destroy]
  before_action :authenticate_user_from_token!, :except => [:create]

  def create
    super
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
