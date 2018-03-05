class Api::V1::ServiceTypesController < Api::V1::BaseController
  def index
    respond_with :service_types => ServiceType.where(publish: true).order(id: :asc)
  end
end

