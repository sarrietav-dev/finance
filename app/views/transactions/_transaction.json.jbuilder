json.extract! transaction, :id, :avatar, :name, :category, :date, :amount, :recurring, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
