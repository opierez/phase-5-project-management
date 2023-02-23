class TasksController < ApplicationController

    def index 
        column = Column.find(params[:column_id])
        tasks = column.tasks 
        render json: tasks, status: :ok 
    end

    def create
        column = Column.find(params[:column_id])
        new_task = Task.create!(task_params.merge(is_completed?: false, column_id: column.id))
        render json: new_task, status: :created 
    end


    private 

    def task_params 
        params.permit(:title, :description, :due_date, :column_id)
    end

end
