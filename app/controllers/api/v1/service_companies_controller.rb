class Api::V1::ServiceCompaniesController < Api::V1::BaseController
  def index
    respond_with ServiceCompany.where(publish: true).order(name: :asc)
  end
end

