class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.string :title
      t.boolean :is_favorite?
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
