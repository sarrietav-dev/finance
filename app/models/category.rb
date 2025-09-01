class Category < ApplicationRecord
  has_many :transactions
  has_many :budgets

  validates :name, presence: true, uniqueness: true

  # Default scope to ensure all queries are scoped to current user
  default_scope -> {
    if Current.user
      joins(:transactions).where(transactions: {user: Current.user}).distinct
    end
  }

  # Class method for scoped queries when default scope might not be available
  def self.for_current_user
    if Current.user
      joins(:transactions).where(transactions: {user: Current.user}).distinct
    end
  end
end
