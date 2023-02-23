class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :due_date, :completed 
  

  # updates the is_completed? attribute to completed so it can be handled better on the frontend ("?" causing frontend issues)
  def completed 
    if :is_completed? == true 
      return true
    else 
      return false 
    end
  end
  
end
