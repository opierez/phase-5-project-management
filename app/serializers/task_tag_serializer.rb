class TaskTagSerializer < ActiveModel::Serializer
  attributes :id
  has_one :task
  has_one :tag
end
