class TagsController < ApplicationController

    def index 
        render json: Tag.all.group_by(&:category), status: :ok 
    end


end
