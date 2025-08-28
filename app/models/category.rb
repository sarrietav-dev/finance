class Category < ApplicationRecord
  has_many :transactions
  has_many :budgets

  validates :name, presence: true, uniqueness: true
end
