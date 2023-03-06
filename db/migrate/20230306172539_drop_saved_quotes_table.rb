class DropSavedQuotesTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :saved_quotes
  end
end
