class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_one :board
  has_many :tasks 
end
