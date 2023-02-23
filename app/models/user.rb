class User < ApplicationRecord
    has_secure_password
    has_many :boards, dependent: :destroy  
    has_many :saved_quotes, dependent: :destroy 
    has_many :quotes, through: :saved_quotes
end
