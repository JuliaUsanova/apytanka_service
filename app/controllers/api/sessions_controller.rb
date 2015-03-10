class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      log_in user
    else
      render json: {errors: ['Authentication failed. Please try another email or password.']}
    end
  end

  def destroy

  end
end
