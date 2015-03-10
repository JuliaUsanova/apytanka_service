module Api

  class UsersController < ApplicationController
  def create
    user = User.new(safe_params)
    if user.save
      render json: user
    else
      render json: {errors: user.errors.full_messages}
    end

  end

  def update
    user.update_attributes(safe_params)
    render nothing: true
  end

  private

  def safe_params
    params[:user][:password] = params[:password]
    safe_params = params.require(:user).permit(:name, :surname, :email, :password, :sex)
  end

end

end