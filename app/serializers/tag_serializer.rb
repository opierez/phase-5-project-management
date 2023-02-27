class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :color

  # def category 
  #   tags = Tag.all.group_by(&:category)
  #   new_tags_array = {
  #     priority: tags['priority'], 
  #     status: tags['status'],
  #     stage: tags['stage']
  #   }
  #   return new_tags_array
  # end

end
