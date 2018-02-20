class CreateServiceTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :service_types do |t|
      t.string :name
      t.string :description
      t.boolean :publish, :default => 0

      t.timestamps
    end
  end
end
