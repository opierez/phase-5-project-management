class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_favorite?
  has_one :user
end
