class Api::V1::SessionsController < ApplicationController

  def create
    user_email = params[:user_email].presence
    user = User.find_by_email(user_email)

    if user && user.valid_password?(params[:password])
      render json: user.as_json(only: [:email, :authentication_token]), status: :created
    else
      head(:unauthorized)
    end
  end


  def destroy
  end

end