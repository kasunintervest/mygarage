Rails.application.routes.draw do

  root to: 'page#home'

  devise_for :users, :controllers => { registrations: 'registrations' }

  namespace :api do
    namespace :v1 do
      resources :vehicles, only: [:index, :create, :destroy, :update, :show]
    end
  end
end
