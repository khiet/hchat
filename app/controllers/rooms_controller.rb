class RoomsController < ApplicationController
  def index
    if available_room
      available_room.user_rooms.create(user: current_user)
      available_room.update(available: false)

      flash['notice'] = "joined a chat room: #{available_room.id}"
      redirect_to room_path(available_room)
    else
      room = create_room

      flash['notice'] = "joined a chat room: #{room.id}"
      redirect_to room_path(room)
    end
  end

  def show
    @room = current_user.rooms.find_by(id: params[:id])
    redirect_to root_path and return unless @room

    @messages = Message.where(user_room_id: @room.user_room_ids).order(created_at: :asc)
  end

  private

  def available_room
    @available_room ||= Room.joins(:user_rooms).where('user_rooms.user_id != ? AND rooms.available = ?', current_user, true).first
  end

  def create_room
    Room.create.tap do |room|
      room.user_rooms.create(user: current_user)
    end
  end
end
