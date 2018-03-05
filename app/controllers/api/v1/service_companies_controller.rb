class Api::V1::ServiceCompaniesController < Api::V1::BaseController
  def index
    respond_with :service_companies => ServiceCompany.where(publish: true).order(name: :asc)
  end
end

