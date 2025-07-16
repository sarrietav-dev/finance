# frozen_string_literal: true

module TransactionsSorting
  extend ActiveSupport::Concern

  private

  def sort_scope(transactions, sort_param)
    case sort_param
    when "desc"
      order_by_created_at(transactions, :desc)
    when "asc"
      order_by_created_at(transactions, :asc)
    when "amount_desc"
      order_by_amount(transactions, :desc)
    when "amount_asc"
      order_by_amount(transactions, :asc)
    else
      transactions
    end
  end

  def order_by_created_at(transactions, direction)
    transactions.order(created_at: direction)
  end

  def order_by_amount(transactions, direction)
    transactions.order(amount: direction)
  end
end
