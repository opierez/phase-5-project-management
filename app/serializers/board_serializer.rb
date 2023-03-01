class BoardSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_favorite
  # has_one :user

  # def is_favorite 
  #   object.is_favorite 
  # end

end
