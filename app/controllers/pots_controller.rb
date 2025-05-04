class PotsController < ApplicationController
  before_action :set_pot, only: %i[show edit update destroy]

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
        format.html { redirect_to @pot, notice: "Pot was successfully created." }
        format.json { render :show, status: :created, location: @pot }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @pot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pots/1 or /pots/1.json
  def update
    respond_to do |format|
      if @pot.update(pot_params)
        format.html { redirect_to @pot, notice: "Pot was successfully updated." }
        format.json { render :show, status: :ok, location: @pot }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @pot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pots/1 or /pots/1.json
  def destroy
    @pot.destroy!

    respond_to do |format|
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
    params.expect(pot: [:name, :target, :total, :theme])
  end
end
