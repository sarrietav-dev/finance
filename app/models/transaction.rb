# frozen_string_literal: true

class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  # Default scope to ensure all queries are scoped to current user
  default_scope -> { where(user: Current.user) if Current.user }

  scope :recurring, -> { where(recurring: true) }

  # Class method for scoped queries when default scope might not be available
  def self.for_current_user
    where(user: Current.user) if Current.user
  end

  def self.latest_recurring_by_vendor
    sub = select("DISTINCT name, date, amount, user_id")
      .recurring
      .order(:name, date: :desc)

    from(sub, :transactions)
  end

  def self.recurring_for_user(user)
    where(user: user)
      .recurring
      .order(:name, date: :desc)
      .limit(5)
  end
end
