# frozen_string_literal: true

class ResetAndSeedDataJob < ApplicationJob
  queue_as :default

  # Class method to manually trigger the job for testing
  def self.perform_now
    new.perform
  end

  def perform
    Rails.logger.info "Starting data reset and seed job"

    # Clear all existing data
    clear_all_data

    # Seed fresh data
    seed_data

    Rails.logger.info "Data reset and seed job completed successfully"
  end

private

  def clear_all_data
    # Clear in reverse dependency order to avoid foreign key constraint issues
    Transaction.delete_all
    Budget.delete_all
    Pot.delete_all
    Category.delete_all
    Session.delete_all
    User.delete_all

    Rails.logger.info "All data cleared"
  end

  def seed_data
    # Create demo user
    demo_user = User.create!(
      email_address: "demo@example.com",
      password: "demo123",
      password_confirmation: "demo123"
    )

    # Create categories
    categories = [
      "Entertainment", "Bills", "Groceries", "Dining Out", "Transportation",
      "Personal Care", "Education", "Lifestyle", "Shopping", "General"
    ].map do |category_name|
      Category.create!(name: category_name, user: demo_user)
    end

    # Create some sample budgets
    categories.first(5).each do |category|
      Budget.create!(
        category: category,
        maximum: rand(100..500),
        theme: ["green", "yellow", "cyan", "navy", "purple", "light_purple", "turquoise", "brown", "magenta", "blue", "navy_gray", "army_green", "gold", "orange"].sample,
        user: demo_user
      )
    end

    # Create some sample pots
    pot_names = ["Vacation Fund", "Emergency Fund", "New Car", "Home Renovation"]
    pot_names.each do |name|
      Pot.create!(
        name: name,
        target: rand(1000..10000),
        total: rand(0..500),
        theme: ["green", "yellow", "cyan", "navy", "purple", "light_purple", "turquoise", "brown", "magenta", "blue", "navy_gray", "army_green", "gold", "orange"].sample,
        user: demo_user
      )
    end

    # Create more realistic sample transactions
    sample_transactions = [
      {name: "Netflix Subscription", amount: 15.99, category: categories.find { |c| c.name == "Entertainment" }, recurring: true},
      {name: "Grocery Shopping", amount: 85.50, category: categories.find { |c| c.name == "Groceries" }, recurring: false},
      {name: "Gas Station", amount: 45.00, category: categories.find { |c| c.name == "Transportation" }, recurring: false},
      {name: "Restaurant Dinner", amount: 65.00, category: categories.find { |c| c.name == "Dining Out" }, recurring: false},
      {name: "Electric Bill", amount: 120.00, category: categories.find { |c| c.name == "Bills" }, recurring: true},
      {name: "Internet Bill", amount: 79.99, category: categories.find { |c| c.name == "Bills" }, recurring: true},
      {name: "Coffee Shop", amount: 4.50, category: categories.find { |c| c.name == "Dining Out" }, recurring: false},
      {name: "Movie Theater", amount: 25.00, category: categories.find { |c| c.name == "Entertainment" }, recurring: false},
      {name: "Haircut", amount: 35.00, category: categories.find { |c| c.name == "Personal Care" }, recurring: false},
      {name: "Uber Ride", amount: 18.50, category: categories.find { |c| c.name == "Transportation" }, recurring: false},
      {name: "Amazon Purchase", amount: 45.99, category: categories.find { |c| c.name == "Shopping" }, recurring: false},
      {name: "Gym Membership", amount: 29.99, category: categories.find { |c| c.name == "Lifestyle" }, recurring: true}
    ]

    # Create transactions over the last 30 days
    sample_transactions.each_with_index do |transaction_data, index|
      Transaction.create!(
        name: transaction_data[:name],
        amount: transaction_data[:amount],
        category: transaction_data[:category],
        date: (index * 2.5).days.ago, # Spread transactions over time
        user: demo_user,
        recurring: transaction_data[:recurring]
      )
    end

    Rails.logger.info "Demo data seeded successfully"
  end
end
