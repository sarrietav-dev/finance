class TransactionsController < ApplicationController
  before_action :set_transaction, only: %i[show edit update destroy]

  # GET /transactions or /transactions.json
  def index
    @transactions = Transaction.all

    if params[:category].present? && params[:category] != "all"
      @transactions = @transactions.where(category: params[:category])
    end

    if params[:search].present?
      @transactions = @transactions.where("name LIKE ?", "%#{params[:search]}%")
    end

    case params[:sort]
    when "desc"
      @transactions = @transactions.order(created_at: :desc)
    when "asc"
      @transactions = @transactions.order(created_at: :asc)
    when "amount_desc"
      @transactions = @transactions.order(amount: :desc)
    when "amount_asc"
      @transactions = @transactions.order(amount: :asc)
    end

    respond_to do |format|
      format.turbo_stream {
        render turbo_stream: turbo_stream.update("transaction_table",
          partial: "transactions/table",
          locals: {
            transactions: @transactions
          })
      }
      format.html
    end
  end

  # GET /transactions/1 or /transactions/1.json
  def show
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
  end

  # GET /transactions/1/edit
  def edit
  end

  # POST /transactions or /transactions.json
  def create
    @transaction = Transaction.new(transaction_params)

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to @transaction, notice: "Transaction was successfully created." }
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
        format.html { redirect_to @transaction, notice: "Transaction was successfully updated." }
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
      format.html { redirect_to transactions_path, status: :see_other, notice: "Transaction was successfully destroyed." }
      format.json { head :no_content }
    end
  end

private

  # Use callbacks to share common setup or constraints between actions.
  def set_transaction
    @transaction = Transaction.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def transaction_params
    params.expect(transaction: [:avatar, :name, :category, :date, :amount, :recurring])
  end
end
