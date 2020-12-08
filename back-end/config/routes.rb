Rails.application.routes.draw do
  resources :toy_lists
  resources :toys
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
