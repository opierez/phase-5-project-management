class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.date :due_date
      t.boolean :is_completed?
      t.belongs_to :column, null: false, foreign_key: true

      t.timestamps
    end
  end
end
