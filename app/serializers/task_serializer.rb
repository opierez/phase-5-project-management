class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date, :is_completed?
  has_one :column
end
