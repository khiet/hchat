class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate

  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find_by(id: cookies[:user_id])
  end

  def authenticate
    unless User.exists?(id: cookies[:user_id])
      user = User.create!

      cookies[:user_id] = user.id
    end
  end
end
