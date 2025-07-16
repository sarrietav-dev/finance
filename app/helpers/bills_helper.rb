# frozen_string_literal: true

module BillsHelper
  def monthly_due_label(date)
    day = date.day
    "Monthly - #{day.ordinalize}"
  end

  def recurring_status(bill, reference_date, paid_vendors_this_month)
    due_day = bill.date.day
    due_date = begin
      Date.new(reference_date.year, reference_date.month, due_day)
    rescue
      nil
    end
    return :invalid_due_date unless due_date

    if paid_vendors_this_month.include?(bill.name)
      :paid
    elsif due_date < reference_date.to_date
      :overdue
    elsif due_date <= (reference_date.to_date + 5)
      :due_soon
    else
      :due_later
    end
  end

  # Returns a Tailwind color class based on the bill name hash
  def color_class(bill)
    color_classes = %w[
      bg-teal-500 bg-orange-400 bg-red-500 bg-blue-300
      bg-purple-500 bg-gray-600 bg-green-500 bg-yellow-600 bg-pink-500 bg-indigo-500
    ]
    color_classes[bill.name.hash % color_classes.size]
  end

  # Returns an SVG icon string based on the bill name hash (demo: 4 icons)
  def icon(bill)
    icons = [
      '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>',
      '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>',
      '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" /></svg>',
      '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" /></svg>'
    ]
    icons[bill.name.hash % icons.size].html_safe
  end

  # Returns the SVG for the checkmark or exclamation icon, styled appropriately
  def status_icon(status)
    case status
    when :paid
      '<span class="inline-flex items-center justify-center rounded-full bg-green-500 text-white w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>'.html_safe
    when :due_soon
      '<span class="inline-flex items-center justify-center rounded-full bg-red-500 text-white w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>'.html_safe
    else
      "".html_safe
    end
  end

  # Returns the Tailwind class for the amount color based on status
  def amount_class(status)
    (status == :due_soon) ? "text-red-600" : "text-gray-900"
  end

  # Returns the formatted due date label (Monthly - 1st, etc.)
  def due_label(date)
    day = date.day
    "Monthly - #{day.ordinalize}"
  end

  # Returns the Tailwind class for the due date text color
  def status_text_class(status)
    case status
    when :paid
      "text-green-600"
    when :due_soon
      "text-red-600"
    else
      "text-gray-500"
    end
  end
end
