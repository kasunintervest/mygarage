class Api::V1::ServiceRecordsController < Api::V1::BaseController
  before_action :set_vehicle

  def index
    per_page = params[:per_page].present? ? params[:per_page] : nil
    service_records  = @vehicle.service_records.paginate(:page => params[:page], :per_page => per_page)
    respond_with :service_records => service_records, :current_page => service_records.current_page,
                 :total_pages => service_records.total_pages, :per_page => service_records.per_page,
                 :total_entries => service_records.total_entries
  end

  def show
    service_record = @vehicle.service_records.find(params[:id])
    respond_with @vehicle, service_record.to_json
  end

  def create
    service_record = @vehicle.service_records.new(service_record_params)
    service_record.save
    respond_with :api, :v1, @vehicle, service_record, json:service_record.to_json
  end

  def destroy
    service_record = @vehicle.service_records.find(params[:id])
    respond_with @vehicle, service_record.destroy
  end

  def update
    service_record = @vehicle.service_records.find(params[:id])
    service_record.update_attributes(service_record_params)
    respond_with @vehicle, service_record, json: service_record.to_json
  end

  private
  def service_record_params
    params.require(:service_record).permit(:service_type_id, :service_date, :details, :mileage, :cost, :service_company_id, :attachment)
  end

  def set_vehicle
    @vehicle = Vehicle.find(params[:vehicle_id])
    if is_owner @vehicle
      @vehicle
    end
  end
end