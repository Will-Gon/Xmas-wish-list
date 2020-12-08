class Toy < ApplicationRecord
    has_many :toy_lists
    has_many :users, through: :toy_lists
end
