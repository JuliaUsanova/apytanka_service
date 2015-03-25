require 'test_helper'

class UsersEditTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:andy)
    log_in_as @user
  end

  test "unsuccessful edit" do
    get edit_api_user_path(@user)
    patch api_user_path(@user), user: { name:  "",
                                    email: "foo@invalid",
                                    password:              "foo"}
    assert_not_equal @user.reload.name, ""
  end

  test "successful edit" do
    get edit_api_user_path(@user)
    patch api_user_path(@user), user: { name:  "John",
                                        email: "foo@invalid.com",
                                        password:              "foo", address_attributes: {city: "Aloha"}}
    assert_equal @user.reload.address.city, "Aloha"
  end

end
