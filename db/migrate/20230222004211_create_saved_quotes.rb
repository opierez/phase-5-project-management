class CreateSavedQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :saved_quotes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :quote, null: false, foreign_key: true

      t.timestamps
    end
  end
end
