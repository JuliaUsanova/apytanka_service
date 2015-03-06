class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :surname
      t.string :email
      t.integer :sex
      t.datetime :birthday

      t.timestamps null: false
    end
  end
end
