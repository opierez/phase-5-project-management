class Board < ApplicationRecord
  belongs_to :user
  has_many :columns, dependent: :destroy  
  # has_many :tasks, through: :columns 

  validates :title, presence: true 
end
