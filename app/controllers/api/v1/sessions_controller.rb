class Api::V1::SessionsController < ApplicationController

  def create
    user_email = params[:user_email].presence
    user = User.find_by_email(user_email)

    if user && user.valid_password?(params[:password])

      if user.authentication_token.blank?
        if user.save
          user = User.find(user.id)
        end
      end

      render json: {
          success: true,
          message: 'Successfully logged in',
          user_email: user.email,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name
      } , status: 200
    else
      render json: { success: false, message: 'Error with your login or password '+user_email }, status: 401
    end
  end


  def destroy
    token = params[:user_token].presence
    user = User.find_by_authentication_token(token)
    
    if user
      user.authentication_token = nil
      user.save

      render json: { success: true, message: 'Successfully Logged out' }, status: 200

    else
      render json: { success: false, message: 'User not found'} , status: 404

    end

  end

end