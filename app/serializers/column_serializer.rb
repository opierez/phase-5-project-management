class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :board
end
