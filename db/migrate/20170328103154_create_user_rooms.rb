class CreateUserRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :user_rooms do |t|
      t.references :user, foreign_key: true
      t.references :room, type: :uuid, foreign_key: true
      t.boolean :connected

      t.timestamps
    end
  end
end
