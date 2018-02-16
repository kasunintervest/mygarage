class AddRegistrationNumberToVehicles < ActiveRecord::Migration[5.1]
  def change
    add_column :vehicles, :registration_number, :string
    add_column :vehicles, :details, :text
  end
end
