# frozen_string_literal: true

json.extract! pot, :id, :name, :target, :total, :theme, :created_at, :updated_at
json.url pot_url(pot, format: :json)
