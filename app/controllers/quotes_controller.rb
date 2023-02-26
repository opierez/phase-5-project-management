class QuotesController < ApplicationController

    def index 
        render json: Quote.all, status: :ok 
    end

    

end
