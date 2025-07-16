# frozen_string_literal: true

json.extract! budget, :id, :category, :maximum, :theme, :created_at, :updated_at
json.url budget_url(budget, format: :json)
