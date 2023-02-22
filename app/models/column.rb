class Column < ApplicationRecord
  belongs_to :board, dependent: :destroy
  has_many :tasks 
end
