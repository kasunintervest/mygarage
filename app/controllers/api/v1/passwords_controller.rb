class Api::V1::PasswordsController < Devise::PasswordsController
  respond_to :json
  prepend_before_action :require_no_authentication

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with resource, json: {
          :success => true,
          :message => 'You will receive an email with instructions on how to reset your password in a few minutes.'
      }
    else
      respond_with resource
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)

      respond_with resource, json: resource
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  private
  def resource_params
    params.require(:user).permit(:email, :password, :password_confirmation, :reset_password_token)
  end
end
