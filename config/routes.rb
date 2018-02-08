Rails.application.routes.draw do

  root to: 'page#home'

  #devise_for :users, :controllers => { registrations: 'registrations' }

  namespace :api do
    namespace :v1 do
      devise_for :users
      resources :sessions, only: [:create, :destroy]
      resources :vehicles, only: [:index, :create, :destroy, :update, :show]
    end
  end
end
