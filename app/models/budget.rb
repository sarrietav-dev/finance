# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :category, optional: true

  validate :maximum_must_be_positive

  def spent_percentage
    spent = if category.transactions.loaded?
      category.transactions.sum(&:amount)
    else
      category.transactions.sum(:amount)
    end

    value = ((spent / maximum) * 100).round(2)

    value.positive? ? value : 0
  end

private

  def maximum_must_be_positive
    errors.add(:maximum, "must be greater than 0") if maximum.nil? || maximum <= 0
  end
end
