class Api::SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      render json: user, serializer: Api::UserSerializer
    else
      render json: {errors: ['Authentication failed. Please try another email or password.']}
    end
  end

  def destroy
      log_out
  end
end

