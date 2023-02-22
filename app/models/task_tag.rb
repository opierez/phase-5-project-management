class TaskTag < ApplicationRecord
  belongs_to :task, dependent: :destroy
  belongs_to :tag, dependent: :destroy
end
