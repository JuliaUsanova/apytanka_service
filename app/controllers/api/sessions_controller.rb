class Api::SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        params[:session][:remember_me] == "1" ? remember(user) : forget(user)
        render json: user, serializer: Api::UserSerializer
      else
        render json: {errors: ['You should activate your account. Please check your email for the activation link.']}
      end
    else
      render json: {errors: ['Authentication failed. Please try another email or password.']}
    end
  end

  def destroy
    log_out if logged_in?
    render nothing: true
  end
end

