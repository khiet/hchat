class Message < ApplicationRecord
  belongs_to :user_room

  after_create_commit { MessageBroadcastJob.perform_later self }

  def user_id
    user_room.user_id
  end
end
