class ToysController < ApplicationController

    def index
        toys = Toy.all
        render json: toys
    end

    def show 
        toy = Toy.find(params[:id])
        render json: toy
    end

    def update 
        toy = Toy.find(params[:id])
        toy.update(name: params[:name], img_url: params['img_url'], description: params[:description])
        #byebug
        #toy_list = ToyList.find_by(toy_id: toy.id, user_id: params[:user_id])
        render json: toy
    end

    def create
        toy = Toy.find_or_create_by(name: params[:name], img_url: params['img_url'], description: params[:description])
        toy_list = ToyList.create(toy_id: toy.id, user_id: params[:user_id])
        render json: toy
    end

    def destroy 
        toy = Toy.find(params[:id])
        toy.destroy

        render json: {'message': 'Toy deleted'}
    end

end
