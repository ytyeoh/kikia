Rails.application.routes.draw do


  mount Ckeditor::Engine => '/ckeditor'
  resources :blogs
  resources :favorite_listings, only: [:create, :destroy]
  resources :credit_records, only: [:create ,:show]
  resources :user_credits, only: [:new, :index, :show]
  resources :pictures, only: [:destroy]
  resources :listings do 
    collection do
      post :booking
      post :import
      get :autocomplete, :owner, :fav # <= add this line
    end
  end
  
  devise_for :users, :controllers => {:registrations => "users/registrations", :sessions => "users/sessions"}
  resources :users do 
    resources :reviews
    collection do
      get :credit
    end
  end

  post '/rate' => 'rater#create', :as => 'rate'
  post '/credits/checkout' => 'user_credits#create'
 
  root 'home#index'

end
