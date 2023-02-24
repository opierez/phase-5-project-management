class TaskTag < ApplicationRecord
  belongs_to :task
  belongs_to :tag

  validates :task_id, :tag_id, presence: true 

end
