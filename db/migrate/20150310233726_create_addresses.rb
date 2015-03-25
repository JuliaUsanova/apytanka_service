class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :country
      t.string :city
      t.string :street
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :addresses, :users
    add_index :addresses, [:user_id, :created_at]
  end
end
