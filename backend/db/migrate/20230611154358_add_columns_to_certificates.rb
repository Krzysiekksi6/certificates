class AddColumnsToCertificates < ActiveRecord::Migration[5.2]
  def change
    add_column :certificates, :name, :string
    add_column :certificates, :description, :string
    add_column :certificates, :userId, :string
  end
end
