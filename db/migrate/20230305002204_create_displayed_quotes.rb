class CreateDisplayedQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :displayed_quotes do |t|
      t.integer :user_id
      t.integer :quote_id
      t.boolean :displayed 
      t.date :displayed_at
      t.timestamps
    end
  end
end
