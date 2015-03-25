class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.integer :education
      t.integer :speciality
      t.integer :job
      t.integer :experience
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :skills, :users
    add_index :skills, [:user_id, :created_at]
  end
end
