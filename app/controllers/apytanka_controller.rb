class ApytankaController < ApplicationController

  def index

  end

  def home
    unless current_user.nil?
    render json: current_user, serializer: Api::UserSerializer  and return
    end
    render nothing: true if current_user.nil?
  end

end
