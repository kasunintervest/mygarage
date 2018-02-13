class Api::V1::VehiclesController < Api::V1::BaseController
  def index
    vehicles = Vehicle
    vehicles = vehicles.where('user_id = :user_id', :user_id => current_user.id)
    vehicles = vehicles.where('name LIKE :name', :name => '%'+params[:search_text]+'%') if params[:search_text]
    vehicles = vehicles.paginate(:per_page => 20, :page => params[:page])

    respond_with :vehicles => vehicles, :current_page => vehicles.current_page, :total_pages => vehicles.total_pages
  end

  def show
    vehicle = Vehicle.find(params[:id])
    if is_owner vehicle
      respond_with vehicle.to_json(:methods => [:image])
    end
  end

  def create
    vehicle = Vehicle.new(vehicle_params)
    vehicle.user_id = current_user.id
    vehicle.save
    respond_with :api, :v1, vehicle
  end

  def destroy
    vehicle = Vehicle.find(params[:id])
    if is_owner vehicle
      respond_with vehicle.destroy(params[:id])
    end
  end

  def update
    vehicle = Vehicle.find(params[:id])
    if is_owner vehicle
      if vehicle.update_attributes(vehicle_params)
        uploaded = upload_image vehicle

        if uploaded.errors.messages[:image].any?
          respond_with vehicle, json: { :errors => {:image => uploaded.errors.messages[:image]}}, :status => :unprocessable_entity
        else
          render_vehicle vehicle.id
        end
      else
        respond_with vehicle, json: vehicle
      end
    end
  end

  private
  def is_owner(vehicle)
    if vehicle.user_id != current_user.id
      head(:unauthorized)
      false
    else
      true
    end
  end

  def upload_image(vehicle)
      image = Picture.new(image_params)
      image.vehicle_id = vehicle.id
      image.save if image.valid?
      image
  end

  def render_vehicle(id)
    vehicle = Vehicle.find(id)
    respond_with vehicle, json: vehicle.to_json(:methods => [:image])
  end

  def vehicle_params
    params.require(:vehicle).permit(:name, :make, :model, :year, :colour)
  end

  def image_params
    params.require(:vehicle).permit(:image)
  end
end