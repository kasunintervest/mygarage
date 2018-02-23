module Admin
  class ServiceRecordsController < ApplicationController
    before_action :set_vehicle

    def index
      @service_records  = @vehicle.service_records.order(:id => :desc).paginate(:page => params[:page])
    end

    def show
    end

    def new
      @service_record = @vehicle.service_records.new
    end

    def edit
      @service_record = @vehicle.service_records.find(params[:id])
    end

    def create
      @service_record = @vehicle.service_records.new(service_record_params)
      if @service_record.save
         redirect_to admin_vehicle_service_records_url, notice: 'Service record was successfully created.'
      else
         render :new
      end
    end

    def update
      @service_record = @vehicle.service_records.find(params[:id])
        if @service_record.update(service_record_params)
          redirect_to admin_vehicle_service_records_url, notice: 'Service record was successfully updated.'
        else
          render :edit
        end
    end

    def destroy
      @service_record = @vehicle.service_records.find(params[:id])
      @service_record.destroy
      redirect_to admin_vehicle_service_records_url, notice: 'Service record was successfully destroyed.'
    end

    private
    def service_record_params
      params.require(:service_record).permit(:service_type_id, :service_date, :details, :mileage, :cost, :service_company_id, :attachment)
    end

    def set_vehicle
      @vehicle = Vehicle.find(params[:vehicle_id])
    end
  end
end

