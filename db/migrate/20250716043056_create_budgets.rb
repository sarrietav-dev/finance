# frozen_string_literal: true

class CreateBudgets < ActiveRecord::Migration[8.0]
  def change
    create_table :budgets do |t|
      t.string :category
      t.decimal :maximum
      t.string :theme

      t.timestamps
    end
  end
end
