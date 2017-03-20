class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{user_room.room_id}"
  end

  def unsubscribed
    ActionCable.server.broadcast(
      "room_channel_#{user_room.room_id}",
      leaver_id: browser_user.id
    )
  end

  def speak(data)
    Message.create! content: data['message'], user_room: user_room
  end

  def joined(data)
    ActionCable.server.broadcast(
      "room_channel_#{user_room.room_id}",
      joiner_id: data['joiner_id']
    )
  end

  def typing(data)
    ActionCable.server.broadcast(
      "room_channel_#{user_room.room_id}",
      typer_id: data['typer_id'],
      flag: data['flag']
    )
  end

  private

  def user_room
    @user_room ||= browser_user.user_rooms.find_by(room_id: params[:room_id])
  end
end
