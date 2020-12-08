class CreateToyLists < ActiveRecord::Migration[6.0]
  def change
    create_table :toy_lists do |t|
      t.integer :user_id
      t.integer :toy_id

      t.timestamps
    end
  end
end
