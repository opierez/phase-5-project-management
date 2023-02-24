class BoardsController < ApplicationController

    # 
    def index 
        if params[:user_id]
            user = User.find(params[:user_id])
            boards = user.boards 
        else 
            boards = Board.all 
        end
        render json: boards, status: :ok 
    end

    def create 
        user = User.find(params[:user_id])
        new_board = user.boards.create!(board_params.merge(is_favorite?: false))
        render json: new_board, status: :created 
    end

    def update 
        board = Board.find(params[:id])
        board.update!(board_params)
        render json: board, status: :accepted 
    end

    def destroy 
        board = Board.find(params[:id])
        board.destroy
        head :no_content 
    end

    private 

    def board_params 
        params.permit(:title)
    end


    

end
