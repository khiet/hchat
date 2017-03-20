class Room < ApplicationRecord
  has_many :user_rooms
  has_many :users, through: :user_rooms

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }
end
