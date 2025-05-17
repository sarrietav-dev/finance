class WithdrawalsController < ApplicationController
  def new
    @pot = Pot.find(params[:pot_id])
  end

  def create
  end
end
