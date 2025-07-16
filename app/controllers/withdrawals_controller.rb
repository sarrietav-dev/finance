# frozen_string_literal: true

class WithdrawalsController < ApplicationController
  def new
    @pot = Pot.find(params[:pot_id])
  end

  def create
    @pot = Pot.find(params[:pot_id])
    @pot.total -= withdrawal_params[:amount].to_f

    respond_to do |format|
      if @pot.save
        format.turbo_stream
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update("new_withdrawal",
            partial: "withdrawals/form"),
            status: :unprocessable_entity
        end
      end
    end
  end

  private

  def withdrawal_params
    params.permit(:amount, :pot_id)
  end
end
