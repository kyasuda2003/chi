app =
  settings:
    stage: [
      "main"
      "product"
      "company"
      "news"
      "people"
    ][0]
    path: ["/assets/"][0]

  api: (->
    getAllCategories: ->
      $.get('/')
  )()
window.app=app
