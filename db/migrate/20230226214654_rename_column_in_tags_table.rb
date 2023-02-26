class RenameColumnInTagsTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :tags, :tag_type, :category
  end
end
