class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room

  has_many :messages, dependent: :destroy

  def partner_id
    UserRoom.find_by('room_id = ? AND id != ?', self.room_id, self.id).try(:user_id)
  end
end
