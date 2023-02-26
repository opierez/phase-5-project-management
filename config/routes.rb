Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :tasks
  resources :columns, only: [:index, :update] do 
    resources :tasks, only: [:index, :show, :create]
  end
  resources :saved_quotes
  resources :quotes
  resources :boards, only: [:index, :update, :destroy] do
    resources :columns, only: [:index, :create]
  end
  resources :users, only: [:index, :show] do
    resources :boards, only: [:index, :create]
  end
  

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
