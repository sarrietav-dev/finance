# frozen_string_literal: true

module ApplicationHelper
  def color_options
    [
      ["Green", "green"],
      ["Yellow", "yellow"],
      ["Cyan", "cyan"],
      ["Navy", "navy"],
      ["Purple", "purple"],
      ["Light Purple", "light_purple"],
      ["Turquoise", "turquoise"],
      ["Brown", "brown"],
      ["Magenta", "magenta"],
      ["Blue", "blue"],
      ["Navy Gray", "navy_gray"],
      ["Army Green", "army_green"],
      ["Gold", "gold"],
      ["Orange", "orange"]
    ]
  end

  def theme_css_color(theme)
    case theme
    when "green"
      "hsl(177, 52%, 32%)"
    when "yellow"
      "hsl(28, 73%, 81%)"
    when "cyan"
      "hsl(190, 52%, 68%)"
    when "navy"
      "hsl(248, 8%, 41%)"
    when "purple"
      "hsl(259, 30%, 56%)"
    when "light_purple"
      "hsl(288, 29%, 62%)"
    when "turquoise"
      "hsl(180, 16%, 42%)"
    when "brown"
      "hsl(21, 30%, 44%)"
    when "magenta"
      "hsl(332, 30%, 44%)"
    when "blue"
      "hsl(205, 48%, 47%)"
    when "navy_gray"
      "hsl(214, 11%, 63%)"
    when "army_green"
      "hsl(83, 20%, 47%)"
    when "gold"
      "hsl(47, 50%, 59%)"
    when "orange"
      "hsl(18, 47%, 52%)"
    else
      "hsl(0, 0%, 50%)" # fallback gray
    end
  end
end
