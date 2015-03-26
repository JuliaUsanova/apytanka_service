class ApytankaController < ApplicationController

  respond_to :json

  def index

  end

  def home
    byebug
    render json: current_user, serializer: Api::UserSerializer
  end

end
