# frozen_string_literal: true

module TransactionsHelper
  def parse_amount(amount)
    if amount.negative?
      "-$#{"%.2f" % amount.abs}"
    else
      "$#{"%.2f" % amount}"
    end
  end
end
