class Quote < ApplicationRecord
    has_many :saved_quotes
    has_many :users, through: :saved_quotes 
end
