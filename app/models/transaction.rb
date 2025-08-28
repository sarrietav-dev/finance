# frozen_string_literal: true

class Transaction < ApplicationRecord
  belongs_to :category, optional: true

  scope :recurring, -> { where(recurring: true) }

  def self.latest_recurring_by_vendor
    sub = select("DISTINCT name, date, amount")
      .recurring
      .order(:name, date: :desc)

    from(sub, :transactions)
  end
end
