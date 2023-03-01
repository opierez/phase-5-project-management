class Board < ApplicationRecord
  belongs_to :user
  has_many :columns, dependent: :destroy  
  has_many :tasks, through: :columns 

  validates :title, presence: true 

  # method for getting all the favorite boards for a user
  def self.favorite_boards(user_id) 
    Board.where(user_id: user_id, is_favorite: true)
  end

end
