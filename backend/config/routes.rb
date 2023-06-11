Rails.application.routes.draw do
  resources :certificates, except: [:new, :edit] do
    member do
      put :update
    end
  end
  resources :users
  devise_for :users, defaults: { format: :json }
end
