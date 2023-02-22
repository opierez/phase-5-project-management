class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :author, :text
end
