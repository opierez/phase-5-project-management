class Board < ApplicationRecord
  belongs_to :user, dependent: :destroy 
  has_many :columns 
end
