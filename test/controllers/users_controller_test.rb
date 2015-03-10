require 'test_helper'

class Api::UsersControllerTest < ActionController::TestCase


  test "should sign up user" do
    assert_difference 'User.count', 1 do
      post :create, {user: { name: 'Andrue', surname: 'Hopins', email: 'hoppinses@andrue.com', sex: 0 }, password: "password"}, format: :json
    end
    assert_response :success
  end



end
