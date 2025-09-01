# frozen_string_literal: true

class BudgetsController < ApplicationController
  before_action :set_budget, only: %i[show edit update destroy delete]

  # GET /budgets or /budgets.json
  def index
    set_budgets

    @donut_data = @budgets.map do |budget|
      [budget.category.name, @transaction_sums[budget.category_id].to_f.abs]
    end
    @donut_colors = @budgets.map(&:theme)
  end

  # GET /budgets/1 or /budgets/1.json
  def show
  end

  # GET /budgets/new
  def new
    @budget = Budget.new
    @categories = Category.for_current_user
  end

  # GET /budgets/1/edit
  def edit
    @categories = Category.for_current_user
  end

  # POST /budgets or /budgets.json
  def create
    @budget = Budget.new(budget_params)

    respond_to do |format|
      if @budget.save
        set_budgets
        format.turbo_stream
        format.html { redirect_to budgets_path, notice: "Budget was successfully created." }
        format.json { render :show, status: :created, location: @budget }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update("new_budget",
            partial: "budgets/form"),
            status: :unprocessable_entity
        end
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @pot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /budgets/1 or /budgets/1.json
  def update
    respond_to do |format|
      if @budget.update(budget_params)
        set_budgets
        format.turbo_stream
        format.html { redirect_to budgets_path, notice: "Budget was successfully updated." }
        format.json { render :show, status: :ok, location: @budget }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update("edit_budget",
            partial: "budgets/form"),
            status: :unprocessable_entity
        end
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @budget.errors, status: :unprocessable_entity }
      end
    end
  end

  def delete
  end

  # DELETE /budgets/1 or /budgets/1.json
  def destroy
    @budget.destroy!

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to budgets_path, status: :see_other, notice: "Budget was successfully destroyed." }
      format.json { head :no_content }
    end
  end

private

  # Use callbacks to share common setup or constraints between actions.
  def set_budget
    @budget = Budget.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def budget_params
    params.require(:budget).permit(:maximum, :theme, :category_id)
  end

  def set_budgets
    @budgets = Budget.includes(category: :transactions).for_current_user
    @transaction_sums = @budgets.each_with_object({}) do |budget, sums|
      sums[budget.category_id] = budget.category.transactions.for_current_user.sum(&:amount)
    end
  end
end
