require 'rest-client'

puts "🌱 Seeding data..."

# # destroy existing data 
# DisplayedQuote.destroy_all
# Quote.destroy_all
# Tag.destroy_all
# TaskTag.destroy_all


# # Users
# olivia = User.create(username: "olive", password: "1234", first_name: "Olivia", last_name: "Nunez")
# nicole = User.create(username: "nikki", password: "1234", first_name: "Nicole", last_name: "Saunders")
# miguel = User.create(username: "mike", password: "1234", first_name: "Miguel", last_name: "Phillipe")

# # Boards
# olivia_board1 = Board.create(title: "Content Creation", is_favorite: false, user_id: olivia.id)
# olivia_board2 = Board.create(title: "SE Projects", is_favorite: true, user_id: olivia.id)
# olivia_board3 = Board.create(title: "Photography", is_favorite: false, user_id: olivia.id)
# olivia_board4 = Board.create(title: "Music", is_favorite: false, user_id: olivia.id)
# nicole_board1 = Board.create(title: "DJ Sets", is_favorite: true, user_id: nicole.id)
# nicole_board2 = Board.create(title: "Studies", is_favorite: false, user_id: nicole.id)
# nicole_board3 = Board.create(title: "Crafts", is_favorite: false, user_id: nicole.id)
# miguel_board1 = Board.create(title: "Gaming", is_favorite: false, user_id: miguel.id)

# # Columns
# olivia_board2_column1 = Column.create(name: "To-do", board_id: olivia_board2.id)
# olivia_board2_column2 = Column.create(name: "In progress", board_id: olivia_board2.id)
# olivia_board2_column3 = Column.create(name: "Completed", board_id: olivia_board2.id)

# # Tasks
# olivia_board2_column1_task1 = Task.create(title: "Research external APIs", description: "find quote or joke APIs", due_date: Date.new(2023,2,27), is_completed: false, column_id: olivia_board2_column1.id)
# olivia_board2_column2_task1 = Task.create(title: "Build CRUD Actions", description: "create CRUD actions in Users Controller", due_date: Date.new(2023,2,28), is_completed: false, column_id: olivia_board2_column2.id)
# olivia_board2_column3_task1 = Task.create(title: "Build CRUD Actions", description: "create CRUD actions in Users Controller", due_date: Date.new(2023,3,1), is_completed: false, column_id: olivia_board2_column3.id)
# olivia_board2_column1_task2 = Task.create(title: "Set up routes", description: "Set up navigation and routes on frontend", due_date: Date.new(2023,2,27), is_completed: false, column_id: olivia_board2_column1.id)


# # Tags
# tag_low_priority = Tag.create(name: "Low Priority", category: "priority", color: "#9EE2C0", text_color: '#000000')
# tag_medium_priority = Tag.create(name: "Medium Priority", category: "priority", color: "#FF8B00", text_color: '#000000')
# tag_high_priority = Tag.create(name: "High Priority", category: "priority", color: "#9E1000", text_color: '#FFFFFF')
# tag_status_on_track = Tag.create(name: "On track", category: "status", color: "#6EB65F", text_color: '#000000')
# tag_status_off_track = Tag.create(name: "Off track", category: "status", color: "#7E1907", text_color: '#FFFFFF')
# tag_stage_research = Tag.create(name: "Research", category: "stage", color: "#BAD8FF", text_color: '#000000')
# tag_stage_develop = Tag.create(name: "Development", category: "stage", color: "#FFE97D", text_color: '#000000')
# tag_stage_testing = Tag.create(name: "Testing", category: "stage", color: "#FFC4D8", text_color: '#000000')
# tag_stage_testing = Tag.create(name: "Implementation", category: "stage", color: "#4C50A4", text_color: '#FFFFFF')

# # Task Tags
# olivia_board2_column1_task1_tag1 = TaskTag.create(task_id: olivia_board2_column1_task2.id, tag_id: tag_high_priority.id)
# olivia_board2_column1_task1_tag2 = TaskTag.create(task_id: olivia_board2_column1_task2.id, tag_id: tag_status_on_track.id)
# olivia_board2_column1_task1_tag3 = TaskTag.create(task_id: olivia_board2_column1_task2.id, tag_id: tag_stage_develop.id)


# # Quotes 
# response = RestClient.get('https://type.fit/api/quotes')
# quotes = JSON.parse(response.body)

# quotes.each do |quote|
#   Quote.create(text: quote["text"], author: quote["author"])
# end


puts "✅ Done seeding!"