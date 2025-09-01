# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories
  resources :budgets do
    member do
      get "delete", as: :delete
    end
  end
  resources :pots do
    member do
      get "delete", as: :delete
    end
    resources :deposits, only: %i[new create]
    resources :withdrawals, only: %i[new create]
  end
  resource :session
  resources :passwords, param: :token
  resources :transactions
  get :bills, to: "bills#index"

  # Make overview the root route
  root "dashboard#overview"

  # Keep the overview route for explicit access
  get :overview, to: "dashboard#overview"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
