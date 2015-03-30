class Api::UsersController < ApplicationController
  def create
    user = User.new(safe_params)
    if user.save
        log_in(user)
        render json: user, serializer: Api::UserSerializer
    else
      render json: {errors: user.errors.full_messages}
    end
  end

  def edit
    user = User.find(params[:id])
    if user && user == current_user
      render json: user, serializer: Api::FullUserSerializer
    else
      render json: {errors: ['Please, log in to access profile page']}
    end

  end

  def update
    user = User.find(params[:id])
    if user && user == current_user
      user.update(safe_params_full)
      render json: {result: true}
    end
  end

  private

  def safe_params_full
    safe_params_full = params.require(:user).permit(:avatar, :name, :surname, :email, :sex, :birthday,
                                                           # HOMETASK: look how to show all params
                                                           address_attributes: [:city, :country, :street, :id],
                                                           skills_attributes: [:education, :speciality, :experience, :job, :id]
    )
  end

  def safe_params
    params[:user][:password] = params[:password]
    safe_params = params.require(:user).permit(:name, :surname, :email, :password, :sex)
  end

end

