# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create!(first_name: 'Admin', last_name: 'P', email: 'admin@mygarage.lk', password: 'admin@mygarage')
user.remove_role :customer
user.add_role :admin

ServiceType.create!(name: 'Free Service', publish: 1)
ServiceType.create!(name: 'Warranty Repair', publish: 1)
ServiceType.create!(name: 'General Service', publish: 1)
ServiceType.create!(name: 'Express Lube', publish: 1)
ServiceType.create!(name: 'Other', publish: 1)

ServiceCompany.create!(name: 'Toyota Lanka', publish: 1)
ServiceCompany.create!(name: 'Auto Miraj', publish: 1)

