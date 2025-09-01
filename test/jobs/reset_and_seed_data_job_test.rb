# frozen_string_literal: true

require "test_helper"

class ResetAndSeedDataJobTest < ActiveJob::TestCase
  def setup
    # Create some existing data to test clearing
    @user = User.create!(email_address: "test@example.com", password: "password", password_confirmation: "password")
    @category = Category.create!(name: "Test Category", user: @user)
    @budget = Budget.create!(category: @category, maximum: 100, theme: "green", user: @user)
    @pot = Pot.create!(name: "Test Pot", target: 1000, total: 100, theme: "blue", user: @user)
    @transaction = Transaction.create!(name: "Test Transaction", amount: 50, category: @category, date: Date.current, user: @user)
  end

  test "clears all existing data" do
    # Account for fixture data (2 users) + the one we create in setup
    initial_user_count = User.count
    assert_equal 3, initial_user_count

    ResetAndSeedDataJob.perform_now

    assert_equal 1, User.count # Only demo user should remain
    assert_equal 10, Category.count # 10 categories for demo user
    assert_equal 5, Budget.count # 5 budgets for demo user
    assert_equal 4, Pot.count # 4 pots for demo user
    assert_equal 12, Transaction.count # 12 transactions for demo user
  end

  test "creates demo user with correct credentials" do
    ResetAndSeedDataJob.perform_now

    demo_user = User.find_by(email_address: "demo@example.com")
    assert_not_nil demo_user
    assert demo_user.authenticate("demo123")
  end

  test "creates sample data for demo user" do
    ResetAndSeedDataJob.perform_now

    demo_user = User.find_by(email_address: "demo@example.com")

    # Check categories
    assert_equal 10, demo_user.categories.count
    assert_includes demo_user.categories.pluck(:name), "Entertainment"
    assert_includes demo_user.categories.pluck(:name), "Groceries"

    # Check budgets
    assert_equal 5, demo_user.budgets.count

    # Check pots
    assert_equal 4, demo_user.pots.count
    assert_includes demo_user.pots.pluck(:name), "Vacation Fund"

    # Check transactions
    assert_equal 12, demo_user.transactions.count
    assert_includes demo_user.transactions.pluck(:name), "Netflix Subscription"
  end

  test "uses valid theme colors" do
    ResetAndSeedDataJob.perform_now

    demo_user = User.find_by(email_address: "demo@example.com")
    valid_themes = %w[green yellow cyan navy purple light_purple turquoise brown magenta blue navy_gray army_green gold orange]

    demo_user.budgets.each do |budget|
      assert_includes valid_themes, budget.theme
    end

    demo_user.pots.each do |pot|
      assert_includes valid_themes, pot.theme
    end
  end
end
