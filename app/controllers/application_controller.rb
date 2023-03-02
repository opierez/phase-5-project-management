class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 

    before_action :authorize

    private

    def authorize
        @current_user = User.find_by(id: session[:user_id])
    
        # if the current user can't be found, render unauthorized message
        if @current_user.nil?
            render json: { errors: ["Not authorized, please log in"] }, status: :unauthorized
        # if the user_id parameter is present in the request and is not equal to the current/logged-in user's id, then return unauthorized error message
        elsif params[:user_id].present? && params[:user_id].to_i != @current_user.id
            render json: { errors: ["Not authorized to access this resource"] }, status: :unauthorized
        end
    end

    def render_unprocessable_entity invalid 
        render json: {errors: invalid.record.errors.full_messages }, status: :unprocessable_entity 
    end

    def render_not_found(error)
        render json: {errors: {error.model => "Not Found"}}, status: :not_found
    end 


end
