class ColumnsController < ApplicationController

    def index 
        board = Board.find(params[:board_id])
        columns = board.columns 
        render json: columns, status: :ok 
    end

end
