# frozen_string_literal: true

class BillsController < ApplicationController
  include BillsHelper
  def index
    # Get all recurring bills (latest per vendor)
    @recurring_bills = Transaction.latest_recurring_by_vendor

    # Get all recurring transactions for the current month
    start_of_month = Time.zone.today.beginning_of_month
    end_of_month = Time.zone.today.end_of_month
    recurring_this_month = Transaction.recurring.where(date: start_of_month..end_of_month)

    # Vendors with a recurring bill paid this month
    @paid_vendors_this_month = recurring_this_month.pluck(:name).uniq

    # Filtering (search by name)
    @recurring_bills = @recurring_bills.where('name ILIKE ?', "%#{params[:search]}%") if params[:search].present?

    # Sorting
    case params[:sort]
    when 'desc' # Latest (earliest in the month)
      @recurring_bills = @recurring_bills.order('EXTRACT(DAY FROM date) ASC')
    when 'asc' # Oldest
      @recurring_bills = @recurring_bills.order('EXTRACT(DAY FROM date) DESC')
    when 'az' # A to Z
      @recurring_bills = @recurring_bills.order(name: :asc)
    when 'za' # Z to A
      @recurring_bills = @recurring_bills.order(name: :desc)
    when 'amount_desc' # Highest
      @recurring_bills = @recurring_bills.order(amount: :desc)
    when 'amount_asc' # Lowest
      @recurring_bills = @recurring_bills.order(amount: :asc)
    end

    # For summary card
    @bills_summary = { paid: { count: 0, sum: 0 }, upcoming: { count: 0, sum: 0 }, due_soon: { count: 0, sum: 0 } }
    reference_date = Transaction.order(date: :asc).pick(:date)
    @recurring_bills.each do |bill|
      status = recurring_status(bill, reference_date, @paid_vendors_this_month)
      amount = bill.amount.abs
      case status
      when :paid
        @bills_summary[:paid][:count] += 1
        @bills_summary[:paid][:sum] += amount
      when :due_soon
        @bills_summary[:due_soon][:count] += 1
        @bills_summary[:due_soon][:sum] += amount
        @bills_summary[:upcoming][:count] += 1
        @bills_summary[:upcoming][:sum] += amount
      when :due_later
        @bills_summary[:upcoming][:count] += 1
        @bills_summary[:upcoming][:sum] += amount
      end
    end

    @latest_bill_date = Transaction.order(:date).pick(:date)

    respond_to do |format|
      format.html
      format.turbo_stream do
        render turbo_stream: turbo_stream.update('bill_table',
                                                 partial: 'bills/table',
                                                 locals: {
                                                   recurring_bills: @recurring_bills
                                                 })
      end
    end
  end
end
