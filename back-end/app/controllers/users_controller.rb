class UsersController < ApplicationController
    
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def new
    end

    def create
        render json: User.find_or_create_by(name: params[:user])  
    end

    def destroy
    end
end
