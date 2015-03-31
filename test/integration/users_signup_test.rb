require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  def setup
    ActionMailer::Base.deliveries.clear
  end

  test "sign up with activation" do
    assert_difference "User.count", 1 do
      post api_users_path, {user: { name: 'Andrue', surname: 'Hopins', email: 'hoppinses@andrue.com', sex: 0 }, password: "password"}
    end
    assert_equal 1, ActionMailer::Base.deliveries.size
    user = assigns(:user)
    assert_not user.activated?
    # send incorrect token to controller
    get edit_api_account_activation_path("token", email: user.email)
    assert_not is_logged_in?
    # send invalid email
    get edit_api_account_activation_path(user.activation_token, email: 'email@email.ru')
    assert_not is_logged_in?
    # send correct data
    get edit_api_account_activation_path(user.activation_token, email: user.email)
    assert user.reload.activated?
    assert is_logged_in?
  end
end
