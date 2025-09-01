# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create demo user for testing
User.find_or_create_by!(email_address: "demo@example.com") do |user|
  user.password = "demo123"
  user.password_confirmation = "demo123"
end

# Create default user (keeping for backward compatibility)
User.find_or_create_by!(email_address: "user@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
end

# Create categories for demo user
demo_user = User.find_by(email_address: "demo@example.com")
if demo_user
  ["Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education", "Lifestyle", "Shopping", "General"].each do |category_name|
    Category.find_or_create_by!(name: category_name, user: demo_user)
  end
end

# Create categories for default user (keeping for backward compatibility)
default_user = User.find_by(email_address: "user@example.com")
if default_user
  ["Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education", "Lifestyle", "Shopping", "General"].each do |category_name|
    Category.find_or_create_by!(name: category_name, user: default_user)
  end
end
