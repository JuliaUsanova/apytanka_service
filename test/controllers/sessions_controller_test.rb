require 'test_helper'

class Api::SessionsControllerTest < ActionController::TestCase
  test "shouldn't create a new user session" do
    post :create, session: {email: '', password: ''}
    assert session[:user_id].nil?
  end

  test "shouldn create a new user session" do
    user = users(:andy)
    post :create, session: {email: user.email, password: 'password'}
    assert_not session[:user_id].nil?
  end

end
