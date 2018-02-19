module Admin
  class ServiceTypesController < ApplicationController
    before_action :set_service_type, only: [:show, :edit, :update, :destroy]

    def index
      @service_types = ServiceType.paginate(:page => params[:page])
    end

    def show
    end

    def new
      @service_type = ServiceType.new
    end

    def edit
    end

    def create
      @service_type = ServiceType.new(service_type_params)
      if @service_type.save
         redirect_to admin_service_types_url, notice: 'Service type "'+@service_type.name+'" was successfully created.'
      else
         render :new
      end
    end

    def update
        if @service_type.update(service_type_params)
          redirect_to admin_service_types_url, notice: 'Service type "'+@service_type.name+'" was successfully updated.'
        else
          render :edit
        end
    end

    def destroy
      @service_type.destroy
      redirect_to admin_service_types_url, notice: 'Service type "'+@service_type.name+'" was successfully destroyed.'
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_service_type
      @service_type = ServiceType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def service_type_params
      params.require(:service_type).permit(:name, :description, :publish)
    end
  end
end

