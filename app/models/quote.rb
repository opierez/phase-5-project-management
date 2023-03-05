class Quote < ApplicationRecord
    has_many :displayed_quotes 
    has_many :users, through: :displayed_quotes
end
