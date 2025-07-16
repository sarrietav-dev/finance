# frozen_string_literal: true

module TransactionsHelper
  include Pagy::Frontend

  def parse_amount(amount)
    if amount.negative?
      "-$#{'%.2f' % amount.abs}"
    else
      "$#{'%.2f' % amount}"
    end
  end
end
