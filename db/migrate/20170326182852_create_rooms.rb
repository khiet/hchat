class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms, id: :uuid  do |t|
      t.boolean :active, null: false, default: false

      t.timestamps
    end
  end
end
