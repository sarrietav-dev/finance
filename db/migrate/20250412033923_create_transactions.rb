class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.string :avatar
      t.string :name
      t.string :category
      t.datetime :date
      t.decimal :amount
      t.boolean :recurring

      t.timestamps
    end
  end
end
