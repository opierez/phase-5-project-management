Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :tasks
  resources :columns, only: [:update] do 
    resources :tasks, only: [:index, :show, :create]
  end
  resources :saved_quotes
  resources :quotes
  resources :boards, only: [:update, :destroy] do
    resources :columns, only: [:index, :create]
  end
  resources :users, only: [:show] do
    resources :boards, only: [:index, :create]
  end
  

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
