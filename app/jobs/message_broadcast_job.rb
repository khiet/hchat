class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast(
      "room_channel_#{message.user_room.room_id}",
      action: 'speak',
      message: render_message(message),
      sender_id: message.user_id
    )
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
