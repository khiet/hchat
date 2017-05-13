Rails.application.routes.draw do
  resources :rooms, only: [:index, :show] do
    member do
      get :ended
    end
  end

  root to: 'home#index'

  mount ActionCable.server => '/cable'
end
