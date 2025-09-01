# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  # Default scope to ensure all queries are scoped to current user
  default_scope -> { where(user: Current.user) if Current.user }

  validate :maximum_must_be_positive

  # Class method for scoped queries when default scope might not be available
  def self.for_current_user
    where(user: Current.user) if Current.user
  end

  def spent_percentage
    return 0 if maximum.nil? || maximum <= 0 || category.nil?

    spent = if category.transactions.loaded?
      category.transactions.joins(:user).where(users: {id: user_id}).sum(&:amount)
    else
      category.transactions.joins(:user).where(users: {id: user_id}).sum(:amount)
    end

    # Handle negative amounts (expenses) and calculate percentage
    spent = spent.abs if spent.negative?
    value = ((spent / maximum) * 100).round(2)

    value.positive? ? value : 0
  end

  def spent_amount
    return 0 if category.nil?

    if category.transactions.loaded?
      category.transactions.joins(:user).where(users: {id: user_id}).sum(&:amount)
    else
      category.transactions.joins(:user).where(users: {id: user_id}).sum(:amount)
    end
  end

private

  def maximum_must_be_positive
    errors.add(:maximum, "must be greater than 0") if maximum.nil? || maximum <= 0
  end
end
