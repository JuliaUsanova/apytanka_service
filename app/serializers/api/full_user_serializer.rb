class Api::FullUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :surname, :email, :sex, :birthday, :skills_attributes, :address_attributes

  def address_attributes
    object.address
  end

  def skills_attributes
    object.skills.all
  end

  #has_one :address
  #has_many :skills
end
