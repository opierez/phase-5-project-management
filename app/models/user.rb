class User < ApplicationRecord
    has_secure_password
    has_many :boards 
    has_many :saved_quotes
    has_many :quotes, through: :saved_quotes
end
