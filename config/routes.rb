Rails.application.routes.draw do
  root to: 'page#home'

  namespace :api do
    namespace :v1 do
      devise_for :users, skip: [:sessions], :controllers => { registrations: 'api/v1/registrations' }
      resources :sessions, only: [:create, :destroy]
      resources :vehicles, only: [:index, :create, :destroy, :update, :show] do
        resources :service_records, only: [:index, :create, :destroy, :update, :show]
      end
      resources :service_companies, only: [:index]
      resources :service_types, only: [:index]
    end
  end

  devise_for :admin_users, path: 'admin', path_names: { sign_in: '/'}
  namespace :admin do
    get 'dashboard', to: 'dashboard#index', as: 'dashboard'
    resources :service_companies
    resources :service_types
    resources :vehicles do
      resources :service_records
    end
    resources :users
  end
end
