class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{user_room.room_id}"
    stream_from "room_channel_#{user_room.room_id}_#{browser_user.id}"

    if user_room.partner_id
      ActionCable.server.broadcast(
        "room_channel_#{user_room.room_id}_#{user_room.partner_id}",
        action: 'joined',
        joinerId: browser_user.id
      )
    end
  end

  def unsubscribed
    if user_room.partner_id
      ActionCable.server.broadcast(
        "room_channel_#{user_room.room_id}_#{user_room.partner_id}",
        action: 'left',
        leaverId: browser_user.id
      )
    else
      room.update(available: false)
    end
  end

  def speak(data)
    Message.create!(content: data['message'], user_room: user_room)
  end

  def typing(data)
    return unless user_room.partner_id

    ActionCable.server.broadcast(
      "room_channel_#{user_room.room_id}_#{user_room.partner_id}",
      action: 'typing',
      typerId: data['typerId'],
      flag: data['flag']
    )
  end

  private

  def room
    @room ||= user_room.room
  end

  def user_room
    @user_room ||= browser_user.user_rooms.find_by(room_id: params[:room_id])
  end
end
