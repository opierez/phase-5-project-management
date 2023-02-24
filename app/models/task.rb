class Task < ApplicationRecord
  belongs_to :column
  # has_one :board, through: :column  
  has_many :task_tags, dependent: :destroy  
  has_many :tags, through: :task_tags

  validates :title, :description, :due_date, presence: true 
  validates :description, length: { maximum: 800 }

end
