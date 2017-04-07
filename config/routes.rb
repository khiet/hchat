Rails.application.routes.draw do
  resources :rooms, only: [:index, :show]

  root to: 'home#index'

  mount ActionCable.server => '/cable'
end
