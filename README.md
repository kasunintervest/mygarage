# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version 2.3.6

* Rails version 5.1.4


Install RVM
----------------------------------
curl -sSL https://get.rvm.io | bash


Install Ruby
----------------------------------
rvm install ruby-2.3.6
rvm --default use ruby-2.3.6


Install MyGarage App
----------------------------------
git clone https://github.com/kasunintervest/mygarage.git


# RAILS COMMANDS
----------------------------------
bundle install
rails db:migrate


# FOLDER PERMISSIONS
----------------------------------
sudo chmod 777 -R public/system


#API ROUTES

Sign in
-----------------------------------
POST : http://localhost:3000/api/v1/sessions
    params: user_email, password
    response: user_token, email

Logout
-----------------------------------
DELETE: http://localhost:3000/api/v1/sessions/1
    params: user_token

Get resource
-----------------------------------
http://localhost:3000/api/v1/vehicles.json?user_email=admin@example.com&user_token=MHKyhSuXg2QN1h7mnTEX
