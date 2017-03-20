require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Hchat
  class Application < Rails::Application
    config.generators do |g|
      g.test_framework nil
      g.assets  false
      g.helper false
    end
  end
end
