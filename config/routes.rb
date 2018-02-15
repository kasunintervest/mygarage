Rails.application.routes.draw do
  root to: 'page#home'

  namespace :api do
    namespace :v1 do
      devise_for :users, skip: [:sessions], :controllers => { registrations: 'registrations' }
      resources :sessions, only: [:create, :destroy]
      resources :vehicles, only: [:index, :create, :destroy, :update, :show]
    end
  end

  devise_for :admin_users, path: 'admin', path_names: { sign_in: '/', sign_out: 'logout'}
  namespace :admin do
    get 'dashboard', to: 'dashboard#index', as: 'dashboard'
    resources :service_companies
  end
end
