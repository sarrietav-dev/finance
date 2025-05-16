module TransactionsHelper
  include Pagy::Frontend

  def parse_amount(amount)
    if amount < 0
      "-$#{"%.2f" % amount.abs}"
    else
      "$#{"%.2f" % amount}"
    end
  end
end
