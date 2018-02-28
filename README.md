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

OR without RVM install Ruby 2.3
----------------------------------
$ sudo apt-add-repository ppa:brightbox/ruby-ng
$ sudo apt-get update
$ sudo apt-get install ruby2.3 ruby2.3-dev


Install ImageMagick
----------------------------------
sudo apt-get install imagemagick


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


**** How to: Ruby on Rails + Ubuntu + Apache with Passenger
===========================================================
Install Phusion Passenger (an Apache module that lets you run Rails apps easily):
------------------------------------------------------------------------------
sudo gem install passenger
sudo passenger-install-apache2-module

The passenger-install-apache2-module script will guide you through what you need to do to get Passenger working. It
should tell you to copy these lines into your /etc/apache2/apache2.conf:

LoadModule passenger_module /var/lib/gems/2.3.0/gems/passenger-5.2.1/buildout/apache2/mod_passenger.so
<IfModule mod_passenger.c>
 PassengerRoot /var/lib/gems/2.3.0/gems/passenger-5.2.1
 PassengerDefaultRuby /usr/bin/ruby2.3
</IfModule>

MORE INFO: https://nathanhoad.net/how-to-ruby-on-rails-ubuntu-apache-with-passenger
