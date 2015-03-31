require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.create(email: "julia@mail.ru", name: "julia", surname: "me", password: "foobar")
  end

  test "user should be valid" do
    assert @user.valid?
  end

 test "should present" do
    @user.name = "     "
    assert_not @user.valid?
  end

  test "email should be valid" do
    valid_emails = %w[user@mail.com user12+love@mail.ru user.me@mail.ru
                   user_userov@mail.ru U-SerY@mail.ri]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?, "#{email.inspect} should be valid"
    end
  end

  test "invalid emails shouldn't pass" do
    invalid_emails = %w[user,@mail.ru user-@mail.ru user.@mail.ru user@mail,ru user.org user@mail
                    foo@bar_baz.com foo@bar+baz.com]
    invalid_emails.each do |email|
      @user.email = email
      assert_not @user.valid?, "#{email.inspect} should be invalid"
    end
  end

  test "email length should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "email should be unique" do
    new_user = @user.dup
    @user.save
    assert_not new_user.valid?
  end

  test "email should be downcased" do
    email = "EXAMPLE@.mail.ru"
    @user.update(email: email)
    assert_equal @user.reload.email, email.downcase
  end

  test "password length should be more than 3" do
    user = User.create(name: 'user', surname: 'userov', email: 'user@userov.ru', password: "12")
    assert_not user.save
  end

  test "authenticated? method should return false for a user that doesn't have remember_digest" do
    assert_not @user.authenticated?('', :remember)
  end

end
