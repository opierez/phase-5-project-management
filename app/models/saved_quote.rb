class SavedQuote < ApplicationRecord
  belongs_to :user, dependent: :destroy
  belongs_to :quote, dependent: :destroy
end
