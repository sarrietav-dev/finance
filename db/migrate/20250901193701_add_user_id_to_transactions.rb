class AddUserIdToTransactions < ActiveRecord::Migration[8.0]
  def change
    # First add the column as nullable
    add_reference :transactions, :user, null: true, foreign_key: true

    # Update existing records to have a user_id (assuming first user)
    if User.exists?
      first_user_id = User.first.id
      Transaction.where(user_id: nil).update_all(user_id: first_user_id)
    end

    # Now make it NOT NULL
    change_column_null :transactions, :user_id, false
  end
end
