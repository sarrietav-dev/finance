# app/components/dropdown_component.rb
class DropdownComponent < ViewComponent::Base
  def initialize(label:, name: nil, options: nil, selected: nil, autosubmit: false, icon: nil)
    @label = label
    @name = name
    @options = options
    @selected = selected
    @autosubmit = autosubmit
    @icon = icon
  end
end
