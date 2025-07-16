# frozen_string_literal: true

class PotsController < ApplicationController
  before_action :set_pot, only: %i[show edit update destroy delete]

  # GET /pots or /pots.json
  def index
    @pots = Pot.all
  end

  # GET /pots/1 or /pots/1.json
  def show
  end

  # GET /pots/new
  def new
    @pot = Pot.new
  end

  # GET /pots/1/edit
  def edit
  end

  # POST /pots or /pots.json
  def create
    @pot = Pot.new(pot_params)

    respond_to do |format|
      if @pot.save
        format.turbo_stream
        format.html { redirect_to pots_path, notice: "Pot was successfully created." }
        format.json { render :show, status: :created, location: @pot }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update("new_pot",
            partial: "pots/form"),
            status: :unprocessable_entity
        end
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @pot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pots/1 or /pots/1.json
  def update
    respond_to do |format|
      if @pot.update(pot_params)
        format.turbo_stream
        format.html { redirect_to pots_path, notice: "Pot was successfully updated." }
        format.json { render :show, status: :ok, location: @pot }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update("edit_pot",
            partial: "pots/form"),
            status: :unprocessable_entity
        end
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @pot.errors, status: :unprocessable_entity }
      end
    end
  end

  def delete
  end

  # DELETE /pots/1 or /pots/1.json
  def destroy
    @pot.destroy!
    @pots_empty = Pot.none?

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to pots_path, status: :see_other, notice: "Pot was successfully destroyed." }
      format.json { head :no_content }
    end
  end

private

  # Use callbacks to share common setup or constraints between actions.
  def set_pot
    @pot = Pot.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def pot_params
    params.expect(pot: %i[name target theme])
  end
end
