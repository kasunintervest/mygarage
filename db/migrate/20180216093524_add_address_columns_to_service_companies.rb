class AddAddressColumnsToServiceCompanies < ActiveRecord::Migration[5.1]
  def change
    add_column :service_companies, :address, :text
    add_column :service_companies, :phone, :string
    add_column :service_companies, :website_url, :string
    add_column :service_companies, :facebook_url, :string
    add_column :service_companies, :other_details, :text
    add_column :service_companies, :publish, :boolean, :default => 0
  end
end
