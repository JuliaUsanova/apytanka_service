require 'test_helper'

class UsersSessionsTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:andy)
  end

  test "should destroy user session" do
    delete api_sessions_path
    assert_nil session[:user_id]
    assert_nil cookies['remember_token']
    delete api_sessions_path
    assert_response :success
  end

  test "should create cookies" do
    log_in_as(@user, remember_me: "1")
    assert_not_nil session[:user_id]
    assert_not_nil cookies['remember_token']
  end

  test "should not create cookies" do
    log_in_as(@user, remember_me: "0")
    assert_not_nil session[:user_id]
    assert_nil @user[:remember_digest]
    assert_nil cookies['remember_token']
  end

end
