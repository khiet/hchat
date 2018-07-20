<h3 align="center">
  Two-way chat application using Rails Action Cable
</h3>

Project setup
=======================

### Install brew from http://brew.sh/index.html
This will install xcode command line tools, which can take some time (~20 minutes).

### Install git
```
brew install git
```
You may want to setup a development environment like I do with [vim](https://github.com/khiet/vimfiles).

### Install rbenv
Follow the instruction [here](https://github.com/rbenv/rbenv#homebrew-on-macos)

### Install Ruby
```
# Ensure the version installed is the version set in .ruby-version
rbenv install 2.5.1
```


### Install bundler
```
gem install bundler
```

### Setup DB
```
brew install postgres
psql template1 -c '\du'
# create a user called 'root' with no password
createuser -a -d -U USER_DISPLAYED_ON_PREVIOUS_COMMAND -P root
```

### Install project software
```
brew install redis
```

### Project setup
```
bundle install
```
Create `.env` from `.env.example`

### Initialize DB
```
bin/setup
```
