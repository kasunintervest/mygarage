module Admin
  class ServiceCompaniesController < ApplicationController
    before_action :set_service_company, only: [:show, :edit, :update, :destroy]

    def index
      @service_companies = ServiceCompany.paginate(:page => params[:page])
    end

    def show
    end

    def new
      @service_company = ServiceCompany.new
    end

    def edit
    end

    def create
      @service_company = ServiceCompany.new(service_company_params)
      if @service_company.save
         redirect_to admin_service_companies_url, notice: 'Service company "'+@service_company.name+'" was successfully created.'
      else
         render :new
      end
    end

    def update
        if @service_company.update(service_company_params)
          redirect_to admin_service_companies_url, notice: 'Service company "'+@service_company.name+'" was successfully updated.'
        else
          render :edit
        end
    end

    def destroy
      @service_company.destroy
      redirect_to admin_service_companies_url, notice: 'Service company "'+@service_company.name+'" was successfully destroyed.'
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_service_company
      @service_company = ServiceCompany.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def service_company_params
      params.require(:service_company).permit(:name, :description, :address, :phone, :website_url, :facebook_url, :other_details, :publish)
    end
  end
end

