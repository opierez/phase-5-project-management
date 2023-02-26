class RenameColumnInBoardsTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :boards, :is_favorite?, :is_favorite 
  end
end
