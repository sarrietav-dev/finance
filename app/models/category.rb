class Category < ApplicationRecord
  has_many :transactions
  has_many :budgets
  belongs_to :user

  validates :name, presence: true, uniqueness: true

  # Default scope to ensure all queries are scoped to current user
  default_scope -> {
    where(user: Current.user) if Current.user
  }

  # Class method for scoped queries when default scope might not be available
  def self.for_current_user
    where(user: Current.user) if Current.user
  end
end
