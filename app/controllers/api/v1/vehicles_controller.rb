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
      respond_with vehicle
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
      respond_with Vehicle.destroy(params[:id])
    end
  end

  def update
    vehicle = Vehicle.find(params[:id])
    if is_owner vehicle
      vehicle.update_attributes(vehicle_params)
      respond_with vehicle, json: vehicle
    end
  end

  private
  def vehicle_params
    params.require(:vehicle).permit(:name, :make, :model, :year, :colour)
  end

  def is_owner(vehicle)
    if vehicle.user_id != current_user.id
      head(:unauthorized)
      false
    else
      true
    end
  end
end