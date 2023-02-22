Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :tasks
  resources :columns
  resources :saved_quotes
  resources :quotes
  resources :boards, only: [:show, :index]
  resources :users, only: [:show] do
    #nested resource for boards
    resources :boards, only:[:show, :index]
  end
  

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
