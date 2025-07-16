# frozen_string_literal: true

class BudgetsController < ApplicationController
  before_action :set_budget, only: %i[show edit update destroy delete]

  # GET /budgets or /budgets.json
  def index
    @budgets = Budget.all
  end

  # GET /budgets/1 or /budgets/1.json
  def show
  end

  # GET /budgets/new
  def new
    @budget = Budget.new
  end

  # GET /budgets/1/edit
  def edit
  end

  # POST /budgets or /budgets.json
  def create
    @budget = Budget.new(budget_params)

    respond_to do |format|
      if @budget.save
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
    params.expect(budget: %i[category maximum theme])
  end
end
