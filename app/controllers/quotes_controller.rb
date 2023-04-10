class QuotesController < ApplicationController

  def index 
      # Find the current user 
      user = @current_user
    
      # Find the last displayed quote for today
      last_quote_displayed = user.displayed_quotes.find_by(displayed_at: Date.today)
    
      if last_quote_displayed
        # If there was a quote displayed today, render that quote
        render json: last_quote_displayed.quote
      else 
        # If no quote was displayed today, find available quotes
        available_quotes = Quote.where.not(id: user.displayed_quotes.where(displayed: true).pluck(:quote_id))
    
        if available_quotes.any?
          # If there are available quotes, randomly choose one, and create a new displayed quote record
          quote_to_display = available_quotes.sample 
          user.displayed_quotes.create(quote: quote_to_display, displayed: true, displayed_at: Date.today)
          render json: quote_to_display
        else 
          # If there are no available quotes, return error message
          render json: { error: 'No available quotes'}, status: :not_found
        end
      end
  end

    
end
