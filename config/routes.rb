Rails.application.routes.draw do
  resources :task_tags
  resources :tags
  resources :tasks
  resources :columns
  resources :saved_quotes
  resources :quotes
  resources :boards
  resources :users
  

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
