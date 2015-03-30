require 'test_helper'

class SessionsHelperTest < ActionView::TestCase

  def setup
    @user = users(:andy)
    remember(@user)
  end

  test "should create correct user" do
    assert_not_nil current_user
    assert_equal @user, current_user
    assert_not_nil cookies[:user_id]
  end

  test "current_user returns nil when remember digest is wrong" do
    @user.update_attribute(:remember_digest, User.digest(User.secure_token))
    assert_nil current_user
  end

end