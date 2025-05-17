module PotsHelper
  def pot_percentage(total, target)
    return 0 if total.zero?

    percentage = (total.to_f / target) * 100
    percentage.round(2)
  end
end
