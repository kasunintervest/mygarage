class Api::V1::BaseController < ApplicationController
  respond_to :json
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  before_action :authenticate_user_from_token!

  def authenticate_user_from_token!

    user_email = params[:user_email].presence
    user = user_email && User.find_by_email(user_email)

    # Notice how we use Devise.secure_compare to compare the token
    # in the database with the token given in the params, mitigating
    # timing attacks.
    if user && Devise.secure_compare(user.authentication_token, params[:user_token])
      sign_in user, store: false
    else
      head(:unauthorized)
    end
  end

  protected
  def current_user
    token = params[:user_token].presence
    User.find_by_authentication_token(token)
  end

  def render_not_found_response(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def render_unprocessable_entity_response(exception)
    render json: exception.record.errors, status: :unprocessable_entity
  end

  def is_owner(vehicle)
    if vehicle.user_id != current_user.id
      head(:unauthorized)
      false
    else
      true
    end
  end
end