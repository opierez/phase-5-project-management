class BoardsController < ApplicationController

    
    def index 
        user = find_user
        boards = user.boards.order(:title) 
        render json: boards, status: :ok 
    end

    def create 
        user = find_user
        new_board = user.boards.create!(board_params.merge(is_favorite: false))
        render json: new_board, status: :created 
    end

    def update 
        # find the board and update it 
        board = Board.find(params[:id])
        board.update!(board_params)

        # find the current logged in user and their boards sorted alphabetically by title 
        user = @current_user
        updated_boards = user.boards.order(:title)

        # render all of the boards including the updated board 
        render json: updated_boards, status: :accepted 
    end

    def destroy 
        board = Board.find(params[:id])
        board.destroy
        head :no_content 
    end

    # custom action for getting all the favorite boards for a user
    def favorites 
        favorite_boards = Board.favorite_boards(params[:user_id]).order(:title)
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
