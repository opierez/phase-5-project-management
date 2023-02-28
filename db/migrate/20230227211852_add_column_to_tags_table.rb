class AddColumnToTagsTable < ActiveRecord::Migration[7.0]
  def change
    add_column :tags, :text_color, :string
  end
end
