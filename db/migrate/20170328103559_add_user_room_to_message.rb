class AddUserRoomToMessage < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :user_room, foreign_key: true
  end
end
