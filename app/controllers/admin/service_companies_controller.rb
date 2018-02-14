module Admin
  class ServiceCompaniesController < ApplicationController
    before_action :set_service_company, only: [:show, :edit, :update, :destroy]

    def index
      @service_companies = ServiceCompany.all
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

      respond_to do |format|
        if @service_company.save
          format.html { redirect_to [:admin, @service_company], notice: 'Service company was successfully created.' }
          format.json { render :show, status: :created, location: @service_company }
        else
          format.html { render :new }
          format.json { render json: @service_company.errors, status: :unprocessable_entity }
        end
      end
    end

    def update
      respond_to do |format|
        if @service_company.update(service_company_params)
          format.html { redirect_to [:admin, @service_company], notice: 'Service company was successfully updated.' }
          format.json { render :show, status: :ok, location: @service_company }
        else
          format.html { render :edit }
          format.json { render json: @service_company.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @service_company.destroy
      respond_to do |format|
        format.html { redirect_to admin_service_companies_url, notice: 'Service company was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_service_company
      @service_company = ServiceCompany.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def service_company_params
      params.require(:service_company).permit(:name, :description)
    end
  end
end

