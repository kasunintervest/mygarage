class CreateServiceRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :service_records do |t|
      t.references :vehicles, index: true, foreign_key: true
      t.references :service_company, index: true, foreign_key: true
      t.string :service_type
      t.string :service_date
      t.string :details
      t.string :mileage
      t.string :cost

      t.timestamps
    end
  end
end
