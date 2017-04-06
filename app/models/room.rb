class Room < ApplicationRecord
  has_many :user_rooms
  has_many :users, through: :user_rooms

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  def partner(querying_user)
    user_rooms.find_by('user_id != ?', querying_user).user
  end
end
