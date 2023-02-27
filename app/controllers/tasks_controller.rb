class TasksController < ApplicationController

    def index 
        # column = Column.find(params[:column_id])
        # tasks = column.tasks 
        # render json: tasks, status: :ok 
        board = Board.find(params[:board_id])
        tasks = board.tasks
        render json: tasks, status: :ok 
    end

    def create
        column = Column.find(params[:column_id])
        new_task = column.tasks.create!(task_params.merge(is_completed: false))
        
        if params[:tags].length > 0
            new_task_tags = params[:tags].map do |tag_name|
                tag = Tag.find_by(name: tag_name)
                TaskTag.create!(task_id: new_task.id, tag_id: tag.id)
            end
        end

        render json: new_task, status: :created
    end


    private 

    def task_params 
        params.permit(:title, :description, :due_date, :column_id)
    end

end
