class Api::AccountActivationsController < ApplicationController

  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(params[:id], :activation)
      user.activate
      log_in(user)
      if session[:request_url]
        redirect_to session[:request_url]
      else
        redirect_to "#{request.host_with_port}/profile/#{user.id}/edit/about"
      end
    else
      redirect_to root_path

    end
  end

end
