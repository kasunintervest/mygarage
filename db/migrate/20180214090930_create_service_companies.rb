class CreateServiceCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :service_companies do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
