# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :category, optional: true
end
