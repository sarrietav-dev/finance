require "application_system_test_case"

class TransactionsTest < ApplicationSystemTestCase
  setup do
    @transaction = transactions(:one)
  end

  test "visiting the index" do
    visit transactions_url
    assert_selector "h1", text: "Transactions"
  end

  test "should create transaction" do
    visit transactions_url
    click_on "New transaction"

    fill_in "Amount", with: @transaction.amount
    fill_in "Avatar", with: @transaction.avatar
    fill_in "Category", with: @transaction.category
    fill_in "Date", with: @transaction.date
    fill_in "Name", with: @transaction.name
    check "Recurring" if @transaction.recurring
    click_on "Create Transaction"

    assert_text "Transaction was successfully created"
    click_on "Back"
  end

  test "should update Transaction" do
    visit transaction_url(@transaction)
    click_on "Edit this transaction", match: :first

    fill_in "Amount", with: @transaction.amount
    fill_in "Avatar", with: @transaction.avatar
    fill_in "Category", with: @transaction.category
    fill_in "Date", with: @transaction.date.to_s
    fill_in "Name", with: @transaction.name
    check "Recurring" if @transaction.recurring
    click_on "Update Transaction"

    assert_text "Transaction was successfully updated"
    click_on "Back"
  end

  test "should destroy Transaction" do
    visit transaction_url(@transaction)
    accept_confirm { click_on "Destroy this transaction", match: :first }

    assert_text "Transaction was successfully destroyed"
  end
end
