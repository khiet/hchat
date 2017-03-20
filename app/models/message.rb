class Message < ApplicationRecord
  belongs_to :user_room

  after_create_commit { MessageBroadcastJob.perform_later self }
end
