# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
u1 = User.create(name: "Will")

t1 = Toy.create(name: "cars", description: "red car", img_url:"")

tl1 = ToyList.create(user_id: u1.id, toy_id: t1.id)