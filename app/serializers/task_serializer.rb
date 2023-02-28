class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date, :completed, :column_id 
  has_many :tags
  

  # updates the is_completed? attribute to completed so it can be handled better on the frontend ("?" causing frontend issues)
  def completed 
    object.is_completed 
  end
  
end
