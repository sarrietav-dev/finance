# frozen_string_literal: true

class DashboardController < ApplicationController
  def overview
    user = Current.user

    # Financial summary
    @current_balance = user.transactions.sum(:amount) || 0
    @transactions = user.transactions.order(date: :desc).limit(5)
    @pots = user.pots.limit(4)
    @budgets = user.budgets.includes(:category).limit(4)

    # Monthly calculations
    start_of_month = Time.zone.today.beginning_of_month
    end_of_month = Time.zone.today.end_of_month
    monthly_transactions = user.transactions.where(date: start_of_month..end_of_month)
    @income = monthly_transactions.where("amount > 0").sum(:amount) || 0
    @expenses = monthly_transactions.where("amount < 0").sum(:amount).abs || 0

    # Pots summary
    @total_saved = user.pots.sum(:total) || 0

    # Budget data for chart
    if @budgets.any?
      @donut_data = @budgets.map { |budget| [budget.category&.name || "Unknown", budget.spent_amount.abs] }
      @donut_colors = @budgets.map(&:theme)
    else
      @donut_data = []
      @donut_colors = []
    end

    # Recurring bills
    @recurring_bills = Transaction.recurring_for_user(user)
    @total_bills = @recurring_bills.sum(:amount).abs || 0
    @upcoming_bills = @recurring_bills.where("date >= ?", Time.zone.today).sum(:amount).abs || 0
    @due_soon = @recurring_bills.where(date: Time.zone.today..3.days.from_now).sum(:amount).abs || 0
  end
end
