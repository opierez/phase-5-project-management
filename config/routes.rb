Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :saved_quotes
  resources :quotes
  get '/users/:user_id/favorite_boards', to: "boards#favorites"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get '/me', to: "users#show"
  
  resources :tasks, only: [:update, :create, :destroy] do
    resources :task_tags, only: [:create]
  end

  resources :columns, only: [:index, :update, :destroy] do 
    resources :tasks, only: [:index] #took out show and create
  end

  resources :boards, only: [:index, :update, :destroy] do
    resources :columns, only: [:index, :create]
    resources :tasks, only: [:index]
  end

  resources :users, only: [:index, :show] do
    resources :boards, only: [:index, :create]
  end


  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
