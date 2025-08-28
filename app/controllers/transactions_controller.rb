# frozen_string_literal: true

# Controller for managing Transaction records, including listing, creating, updating, and deleting transactions.
class TransactionsController < ApplicationController
  include Pagy::Backend
  include TransactionsSorting

  before_action :set_transaction, only: %i[show edit update destroy]

  # GET /transactions or /transactions.json
  def index
    @categories = Category.all
    @transactions = filtered_transactions
    @pagy, @transactions = pagy(@transactions, items: 10, size: 5)
    respond_to_format
  end

  # GET /transactions/1 or /transactions/1.json
  def show
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
    @categories = Category.all
  end

  # GET /transactions/1/edit
  def edit
    @categories = Category.all
  end

  # POST /transactions or /transactions.json
  def create
    @transaction = Transaction.new(transaction_params)

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to @transaction, notice: t("transactions.created") }
        format.json { render :show, status: :created, location: @transaction }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /transactions/1 or /transactions/1.json
  def update
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to @transaction, notice: t("transactions.updated") }
        format.json { render :show, status: :ok, location: @transaction }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transactions/1 or /transactions/1.json
  def destroy
    @transaction.destroy!

    respond_to do |format|
      format.html do
        redirect_to transactions_path, status: :see_other, notice: t("transactions.destroyed")
      end
      format.json { head :no_content }
    end
  end

private

  # Use callbacks to share common setup or constraints between actions.
  def set_transaction
    @transaction = Transaction.find(params.expect(:id))
  end

  def respond_to_format
    respond_to do |format|
      format.html
      format.turbo_stream { render_turbo_stream_table }
    end
  end

  def render_turbo_stream_table
    render turbo_stream: turbo_stream.update("transaction_table",
      partial: "transactions/table",
      locals: {
        transactions: @transactions,
        pagy: @pagy
      })
  end

  def filtered_transactions
    transactions = Transaction.all
    transactions = filter_by_category(transactions)
    transactions = filter_by_search(transactions)
    sort_scope(transactions, params[:sort])
  end

  def filter_by_category(transactions)
    return transactions unless params[:category].present? && params[:category] != "all"

    transactions.where(category_id: params[:category])
  end

  def filter_by_search(transactions)
    return transactions if params[:search].blank?

    transactions.where("name LIKE ?", "%#{params[:search]}%")
  end

  # Only allow a list of trusted parameters through.
  def transaction_params
    params.require(:transaction).permit(:name, :amount, :date, :recurring, :category_id)
  end
end
