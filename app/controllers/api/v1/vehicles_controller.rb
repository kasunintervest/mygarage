class Api::V1::VehiclesController < Api::V1::BaseController
  before_action :set_vehicle, only: [:show, :update, :destroy]

  def index
    per_page = params[:per_page].present? ? params[:per_page] : nil
    vehicles = Vehicle
    vehicles = vehicles.where('user_id = :user_id', :user_id => current_user.id)
    vehicles = vehicles.where('name LIKE :name', :name => '%'+params[:search_text]+'%') if params[:search_text]
    vehicles = vehicles.paginate(:page => params[:page], :per_page => per_page)

    respond_with :vehicles => vehicles, :current_page => vehicles.current_page, :total_pages => vehicles.total_pages,
                 :per_page => vehicles.per_page, :total_entries => vehicles.total_entries
  end

  def show
    respond_with @vehicle.to_json
  end

  def create
    vehicle = Vehicle.new(vehicle_params)
    vehicle.user_id = current_user.id
    if vehicle.save
      image = upload_image vehicle

      if image.errors.messages[:image].any?
        vehicle.destroy
        respond_with vehicle, json: { :errors => {:image => image.errors.messages[:image]}}, :status => :unprocessable_entity
      else
        render_vehicle vehicle.id
      end
    else
      respond_with :api, :v1, vehicle
    end
  end

  def destroy
    respond_with @vehicle.destroy
  end

  def update
    if @vehicle.update_attributes(vehicle_params)
      image = upload_image @vehicle

      if image.errors.messages[:image].any?
        respond_with @vehicle, json: { :errors => {:image => image.errors.messages[:image]}}, :status => :unprocessable_entity
      else
        render_vehicle @vehicle.id
      end
    else
      respond_with @vehicle, json: @vehicle
    end
  end

  private
  def upload_image(vehicle)
      image = Picture.new(image_params)
      image.vehicle_id = vehicle.id
      image.save if image.valid?
      image
  end

  def render_vehicle(id)
    vehicle = Vehicle.find(id)
    respond_with vehicle, json: vehicle.to_json
  end

  def vehicle_params
    params.require(:vehicle).permit(:name, :make, :model, :year, :colour, :registration_number, :details)
  end

  def image_params
    params.require(:vehicle).permit(:image)
  end

  def set_vehicle
    @vehicle = Vehicle.find(params[:id])
    if is_owner @vehicle
      @vehicle
    end
  end
end