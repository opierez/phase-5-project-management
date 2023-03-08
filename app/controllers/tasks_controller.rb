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
        column = find_column
        new_task = column.tasks.create!(task_params)
        
        if params[:tags].length > 0
            new_task_tags = params[:tags].map do |tag_name|
                tag = Tag.find_by(name: tag_name)
                if tag 
                    TaskTag.create!(task_id: new_task.id, tag_id: tag.id)
                else 
                    new_tag = Tag.create!(tag_params)
                    TaskTag.create!(task_id: new_task.id, tag_id: new_tag.id)
                end
            end
        end

        render json: new_task, status: :created
    end

    def update 
        task = find_task
        task.update!(task_params)

        if params[:tags].present?
            # remove existing task tags
            task.task_tags.destroy_all 

            #create new task tags for the update list of tag names
            params[:tags].each do |tag_name|
                tag = Tag.find_by(name: tag_name)
                TaskTag.create!(task_id: task.id, tag_id: tag.id) 
            end
        end
        render json: task, status: :accepted 
    end

    def destroy 
        task = find_task
        task.destroy
        head :no_content
    end


    private 

    def task_params 
        params.permit(:title, :description, :due_date, :column_id, :is_completed)
    end

    def tag_params 
        params.permit(:name, :category, :color, :text_color)
    end

    def find_task
        Task.find(params[:id])
    end

    def find_column 
        Column.find(params[:column_id])
    end

end
