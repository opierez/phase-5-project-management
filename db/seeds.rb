require 'rest-client'

puts "🌱 Seeding data..."

# destroy existing data 
DisplayedQuote.destroy_all
Quote.destroy_all
Tag.destroy_all
TaskTag.destroy_all


# Users
olivia = User.find_or_create_by(username: "olive", password: "1234", first_name: "Olivia", last_name: "Nunez")
nicole = User.find_or_create_by(username: "nikki", password: "1234", first_name: "Nicole", last_name: "Saunders")
miguel = User.find_or_create_by(username: "mike", password: "1234", first_name: "Miguel", last_name: "Phillipe")

# Boards
olivia_board1 = Board.find_or_create_by(title: "Content Creation", is_favorite: false, user_id: olivia.id)
olivia_board2 = Board.find_or_create_by(title: "SE Projects", is_favorite: true, user_id: olivia.id)
olivia_board3 = Board.find_or_create_by(title: "Photography", is_favorite: false, user_id: olivia.id)
olivia_board4 = Board.find_or_create_by(title: "Music", is_favorite: false, user_id: olivia.id)
nicole_board1 = Board.find_or_create_by(title: "DJ Sets", is_favorite: true, user_id: nicole.id)
nicole_board2 = Board.find_or_create_by(title: "Studies", is_favorite: false, user_id: nicole.id)
nicole_board3 = Board.find_or_create_by(title: "Crafts", is_favorite: false, user_id: nicole.id)
miguel_board1 = Board.find_or_create_by(title: "Gaming", is_favorite: false, user_id: miguel.id)

# Columns
olivia_board2_column1 = Column.find_or_create_by(name: "To-do", board_id: olivia_board2.id)
olivia_board2_column2 = Column.find_or_create_by(name: "In progress", board_id: olivia_board2.id)
olivia_board2_column3 = Column.find_or_create_by(name: "Completed", board_id: olivia_board2.id)

# Tasks
olivia_board2_column1_task1 = Task.find_or_create_by(title: "Research external APIs", description: "find quote or joke APIs", due_date: Date.new(2023,2,27), is_completed: false, column_id: olivia_board2_column1.id)
olivia_board2_column2_task1 = Task.find_or_create_by(title: "Build CRUD Actions", description: "find_or_create_by CRUD actions in Users Controller", due_date: Date.new(2023,2,28), is_completed: false, column_id: olivia_board2_column2.id)
olivia_board2_column3_task1 = Task.find_or_create_by(title: "Build CRUD Actions", description: "find_or_create_by CRUD actions in Users Controller", due_date: Date.new(2023,3,1), is_completed: false, column_id: olivia_board2_column3.id)
olivia_board2_column1_task2 = Task.find_or_create_by(title: "Set up routes", description: "Set up navigation and routes on frontend", due_date: Date.new(2023,2,27), is_completed: false, column_id: olivia_board2_column1.id)


# Tags
tag_low_priority = Tag.find_or_create_by(name: "Low Priority", category: "priority", color: "#9EE2C0", text_color: '#000000')
tag_medium_priority = Tag.find_or_create_by(name: "Medium Priority", category: "priority", color: "#FF8B00", text_color: '#000000')
tag_high_priority = Tag.find_or_create_by(name: "High Priority", category: "priority", color: "#9E1000", text_color: '#FFFFFF')
tag_status_on_track = Tag.find_or_create_by(name: "On track", category: "status", color: "#6EB65F", text_color: '#000000')
tag_status_off_track = Tag.find_or_create_by(name: "Off track", category: "status", color: "#7E1907", text_color: '#FFFFFF')
tag_stage_research = Tag.find_or_create_by(name: "Research", category: "stage", color: "#BAD8FF", text_color: '#000000')
tag_stage_develop = Tag.find_or_create_by(name: "Development", category: "stage", color: "#FFE97D", text_color: '#000000')
tag_stage_testing = Tag.find_or_create_by(name: "Testing", category: "stage", color: "#FFC4D8", text_color: '#000000')
tag_stage_testing = Tag.find_or_create_by(name: "Implementation", category: "stage", color: "#4C50A4", text_color: '#FFFFFF')

# Task Tags
olivia_board2_column1_task1_tag1 = TaskTag.find_or_create_by(task_id: olivia_board2_column1_task2.id, tag_id: tag_high_priority.id)
olivia_board2_column1_task1_tag2 = TaskTag.find_or_create_by(task_id: olivia_board2_column1_task2.id, tag_id: tag_status_on_track.id)
olivia_board2_column1_task1_tag3 = TaskTag.find_or_create_by(task_id: olivia_board2_column1_task2.id, tag_id: tag_stage_develop.id)


# Quotes 
response = RestClient.get('https://type.fit/api/quotes')
quotes = JSON.parse(response.body)

quotes.each do |quote|
  Quote.find_or_create_by(text: quote["text"], author: quote["author"])
end


puts "✅ Done seeding!"