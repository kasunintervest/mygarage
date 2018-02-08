class Api::V1::VehiclesController < Api::V1::BaseController
  def index
    respond_with Vehicle.all
  end

  def show
    respond_with Vehicle.find(params[:id])
  end

  def create
    respond_with :api, :v1, Vehicle.create(vehicle_params)
  end

  def destroy
    respond_with Vehicle.destroy(params[:id])
  end

  def update
    vehicle = Vehicle.find(params["id"])
    vehicle.update_attributes(vehicle_params)
    respond_with vehicle, json: vehicle
  end

  private def vehicle_params
    params.require(:vehicle).permit(:id, :name, :make, :model, :year)
  end
end