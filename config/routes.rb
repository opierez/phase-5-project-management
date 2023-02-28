Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :tasks, only: [:update, :create] do
    resources :task_tags, only: [:create]
  end
  resources :columns, only: [:index, :update] do 
    resources :tasks, only: [:index] #took out show and create
  end
  resources :saved_quotes
  resources :quotes
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
