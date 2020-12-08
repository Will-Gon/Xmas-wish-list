class User < ApplicationRecord
    has_many :toy_lists
    has_many :toys, through: :toy_lists
end
