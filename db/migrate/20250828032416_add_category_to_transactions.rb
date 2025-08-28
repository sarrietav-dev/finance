class AddCategoryToTransactions < ActiveRecord::Migration[8.0]
  def change
    add_reference :transactions, :category, null: true, foreign_key: true
  end
end
