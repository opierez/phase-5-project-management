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
        column = find_column 
        column.update!(column_params)
        render json: column, status: :accepted 
    end

    def destroy 
        column = find_column
        column.destroy 
        head :no_content 
    end

    private 

    def column_params 
        params.permit(:name)
    end

    def find_column 
        Column.find(params[:id])
    end

    def find_board 
        Board.find(params[:board_id])
    end

end
