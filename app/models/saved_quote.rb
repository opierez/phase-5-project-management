class SavedQuote < ApplicationRecord
  belongs_to :user
  belongs_to :quote

  validates :user_id, :quote_id, presence: true 
end
