class BoardsController < ApplicationController

    def index 
        if params[:user_id]
            user = User.find(params[:user_id])
            boards = user.boards 
        else 
            boards = Board.all 
        end
        render json: boards, status: :ok 
    end

end
