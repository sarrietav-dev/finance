# app/components/dropdown_component.rb
class DropdownComponent < ViewComponent::Base
  renders_many :items, "Item"

  def initialize(label:, auto_submit: false, form_field: false, name: nil, options: nil, selected: nil)
    @label = label
    @auto_submit = auto_submit
    @form_field = form_field
    @name = name
    @options = options
    @selected = selected
  end

  class Item < ViewComponent::Base
    def initialize(label, turbo_action: nil, method: :get, data: {})
      @label = label
      @turbo_action = turbo_action
      @method = method
      @data = data
    end
  end
end
