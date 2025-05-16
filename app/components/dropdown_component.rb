# frozen_string_literal: true

class DropdownComponent < ViewComponent::Base
  def initialize(options:, param:, turbo_frame:, label: nil, icon: nil, selected: nil)
    @options = options
    @selected = selected
    @param = param
    @turbo_frame = turbo_frame
    @label = label
    @icon = icon
  end

  def button_label
    selected_option = @options.find { |o| (o.is_a?(Array) ? o[1] : o[0]) == @selected }
    if selected_option
      selected_option.is_a?(Array) ? selected_option[0] : selected_option
    else
      @label || (@options.first.is_a?(Array) ? @options.first[0] : @options.first)
    end
  end
end
