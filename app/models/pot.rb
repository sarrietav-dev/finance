class Pot < ApplicationRecord
  validates :name, presence: true
  validates :target, numericality: {greater_than: 0}
  validates :theme, presence: true, inclusion: {in: ["green", "yellow", "cyan", "navy", "purple"]}
end
