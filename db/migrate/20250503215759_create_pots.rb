class CreatePots < ActiveRecord::Migration[8.0]
  def change
    create_table :pots do |t|
      t.string :name
      t.decimal :target
      t.decimal :total
      t.string :theme

      t.timestamps
    end
  end
end
