# frozen_string_literal: true

class Pot < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :target, numericality: {greater_than: 0}
  validates :total, numericality: {greater_than_or_equal_to: 0}
  validates :theme, presence: true, inclusion: {in: %w[green yellow cyan navy purple]}
end
