class RemoveConnectedColumnFromUserRoom < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_rooms, :connected
  end
end
