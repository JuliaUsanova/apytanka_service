module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
  end

  def log_out
    session.delete(:user_id)
  end

  def current_user
    if ( user_id = session[:user_id] )
    user ||= User.find( user_id )
    elsif ( user_id = cookies[:user_id] )
    end
  end
end
