class User < ActiveRecord::Base
  validates :name, presence: true
  validates :surname, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+[^\-\+\*\.,]@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
            format: {with: VALID_EMAIL_REGEX}, uniqueness: { case_sensitive: false }
  before_save :downcase_email
  has_secure_password
  validates :password, length: {minimum: 3}, presence: true

  # Returns the hash digest of the given string.
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
        BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  private

  def downcase_email
    # Converts email to all lower-case.
    self.email = email.downcase
  end

end
