class BoardsController < ApplicationController

    
    def index 
        if params[:user_id]
            user = find_user
            boards = user.boards 
        else 
            boards = Board.all 
        end
        render json: boards, status: :ok 
    end

    def create 
        user = find_user
        new_board = user.boards.create!(board_params.merge(is_favorite: false))
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

    # custom action for getting all the favorite boards for a user
    def favorites 
        favorite_boards = Board.favorite_boards(params[:user_id])
        render json: favorite_boards, status: :ok 
    end

    private 

    def board_params 
        params.permit(:title, :is_favorite)
    end

    def find_user 
        User.find(params[:user_id])
    end

    

end
