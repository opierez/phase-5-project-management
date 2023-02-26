class ColumnsController < ApplicationController

    def index 
        board = find_board
        columns = board.columns 
        render json: columns, status: :ok 
    end

    def create
        board = find_board
        new_column = board.columns.create!(column_params)
        render json: new_column, status: :created 
    end

    def update 
        column = Column.find(params[:id])
        column.update!(column_params)
        render json: column, status: :accepted 
    end

    private 

    def column_params 
        params.permit(:name)
    end

    def find_board 
        Board.find(params[:board_id])
    end

end
