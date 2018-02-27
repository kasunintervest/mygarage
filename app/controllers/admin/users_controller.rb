module Admin
  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
      @users = User.includes(:roles).paginate(:page => params[:page])
    end

    def show
    end

    def new
      @user = User.new
    end

    def edit
    end

    def create
      @user = User.new(user_params)
      if @user.save
         @user.add_role(params[:user][:role])
         redirect_to admin_users_url, notice: 'User "'+@user.first_name+'" was successfully created.'
      else
         render :new
      end
    end

    def update
        if @user.update(user_params)
          update_role(@user, params[:user][:role])
          redirect_to admin_users_url, notice: 'User "'+@user.first_name+'" was successfully updated.'
        else
          render :edit
        end
    end

    def destroy
      @user.destroy
      redirect_to admin_users_url, notice: 'User "'+@user.first_name+'" was successfully destroyed.'
    end

    private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      if params[:user][:password]
        params.require(:user).permit(:email, :first_name, :last_name, :password)
      else
        params.require(:user).permit(:email, :first_name, :last_name)
      end

    end

    def update_role(user, new_role)
      role = user.roles.first.name
      if role != new_role
        user.remove_role role
        user.add_role new_role
      end
    end
  end
end

