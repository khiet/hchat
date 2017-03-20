class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room

  has_many :messages, dependent: :destroy
end
