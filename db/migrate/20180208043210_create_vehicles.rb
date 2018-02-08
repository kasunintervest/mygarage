class CreateVehicles < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicles do |t|
      t.string :name
      t.string :make
      t.string :model
      t.string :year
      t.string :colour

      t.timestamps
    end
  end
end
