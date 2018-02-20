class CreateServiceRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :service_records do |t|
      t.references :vehicle, index: true, foreign_key: true
      t.references :service_company, index: true, foreign_key: true
      t.references :service_type, index: true, foreign_key: true
      t.date :service_date
      t.string :details
      t.integer :mileage
      t.decimal :cost, :precision => 10, :scale => 2

      t.timestamps
    end
  end
end
