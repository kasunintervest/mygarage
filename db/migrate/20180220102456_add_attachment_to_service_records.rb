class AddAttachmentToServiceRecords < ActiveRecord::Migration[5.1]
  def change
    change_table :service_records do |t|
      t.attachment :attachment
    end
  end
end
