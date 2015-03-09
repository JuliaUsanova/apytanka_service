class User < ActiveRecord::Base
  validates :name, presence: true
  validates :surname, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+[^\-\+\*\.,]@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
            format: {with: VALID_EMAIL_REGEX}, uniqueness: { case_sensitive: false }

  before_save :downcase_email

  has_secure_password

  validates :password, length: {minimum: 3}, presence: true

  private

  def downcase_email
    # Converts email to all lower-case.
    self.email = email.downcase
  end

end
