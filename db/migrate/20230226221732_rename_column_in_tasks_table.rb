class RenameColumnInTasksTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :tasks, :is_completed?, :is_completed 
  end
end
