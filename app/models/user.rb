class User < ActiveRecord::Base
  validates :name, presence: true
  validates :surname, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+[^\-\+\*\.,]@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
            format: {with: VALID_EMAIL_REGEX}, uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, length: {minimum: 3}, presence: true, allow_blank: true
  has_one :address, :dependent => :destroy
  has_many :skills, :dependent => :destroy

  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :skills, reject_if: proc { |attributes| attributes['job'].blank? }

  before_save :downcase_email
  before_create :create_address

  attr_accessor :remember_token

  # Returns the hash digest of the given string.
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
        BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.secure_token
    SecureRandom.urlsafe_base64
  end

  def logged_in?
    self.id == session[:user_id]
  end

  def create_address
    # Creates empty address.
    self.address = Address.new
  end

  def remember
    self.remember_token = User.secure_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  private

  def downcase_email
    # Converts email to all lower-case.
    self.email = email.downcase
  end

end
