class Task < ApplicationRecord
  belongs_to :column, dependent: :destroy
  has_many :task_tags 
  has_many :tags, through: :task_tags
end
