workers Integer(ENV['WEB_CONCURRENCY'])
threads_count = Integer(ENV['RAILS_MAX_THREADS'])
threads threads_count, threads_count

preload_app!

port        ENV['PORT']
environment ENV['RAILS_ENV']

on_worker_boot do
  ActiveRecord::Base.establish_connection
end

plugin :tmp_restart
