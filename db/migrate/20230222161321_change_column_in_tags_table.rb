class ChangeColumnInTagsTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :tags, :type, :tag_type
  end
end
