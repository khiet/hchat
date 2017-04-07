class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate

  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find_by(id: cookies.signed[:user_id])
  end

  def authenticate
    unless User.exists?(id: cookies.signed[:user_id])
      user = User.create!(name: Naming.names.sample)

      cookies.signed[:user_id] = {
        value: user.id,
        expires: 1.hour.from_now
      }
    end
  end
end
