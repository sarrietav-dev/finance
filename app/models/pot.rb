# frozen_string_literal: true

class Pot < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :target, numericality: {greater_than: 0}
  validates :total, numericality: {greater_than_or_equal_to: 0}
  validates :theme, presence: true, inclusion: {in: %w[green yellow cyan navy purple light_purple turquoise brown magenta blue navy_gray army_green gold orange]}

  # Default scope to ensure all queries are scoped to current user
  default_scope -> { where(user: Current.user) if Current.user }

  # Class method for scoped queries when default scope might not be available
  def self.for_current_user
    where(user: Current.user) if Current.user
  end
end
