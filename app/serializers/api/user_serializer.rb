class Api::UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :surname, :email
end
