class RenameActiveColumnOnRoom < ActiveRecord::Migration[5.0]
  def change
    remove_column :rooms, :active
    add_column :rooms, :available, :boolean, null: false, default: true
  end
end
