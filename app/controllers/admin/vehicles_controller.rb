module Admin
  class VehiclesController < ApplicationController
    before_action :set_vehicle, only: [:show, :edit, :update, :destroy]

    def index
      @vehicles = Vehicle.order(:id => 'DESC').paginate(:page => params[:page])
    end

    def show
    end

    def new
      @vehicle = Vehicle.new
    end

    def edit
    end

    def create
      @vehicle = Vehicle.new(vehicle_params)
      @vehicle.user_id = current_admin_user.id
      if @vehicle.save
        image = upload_image @vehicle
        if image.errors.messages[:image].any?
          @vehicle.errors.add(:image, image.errors.messages[:image][0])
          delete_vehicle @vehicle.id
          render :new
        else
          redirect_to admin_vehicles_url, notice: 'Vehicle "'+@vehicle.name+'" was successfully created.'
        end
      else
         render :new
      end
    end

    def update
        if @vehicle.update(vehicle_params)
          image = upload_image @vehicle
          if image.errors.messages[:image].any?
            @vehicle.errors.add(:image, image.errors.messages[:image][0])
            render :new
          else
            redirect_to admin_vehicles_url, notice: 'Vehicle "'+@vehicle.name+'" was successfully updated.'
          end
        else
          render :edit
        end
    end

    def destroy
      @vehicle.destroy
      redirect_to admin_vehicles_url, notice: 'Vehicle "'+@vehicle.name+'" was successfully destroyed.'
    end

    private
    def set_vehicle
      @vehicle = Vehicle.find(params[:id])
    end

    def vehicle_params
      params.require(:vehicle).permit(:name, :make, :model, :year, :colour, :registration_number, :details)
    end

    def image_params
      params.require(:vehicle).permit(:image)
    end

    def upload_image(vehicle)
      image = Picture.new(image_params)
      image.vehicle_id = vehicle.id
      image.save if image.valid?
      image
    end

    def delete_vehicle(id)
      Vehicle.delete(id)
    end
  end
end

