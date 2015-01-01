
#override
String::format = ->
  args = Array::slice.call(arguments, 0)
  @toString().replace /{(\d+)}/g, (match, number) ->
    (if typeof args[number] isnt "undefined" then args[number] else match)


app =
  util:
    array2json: (arr, jsn, key) ->
      for obj of arr
        jsn[arr[obj][key].toString()] = arr[obj]
      return

  ui:
    popupBlock: (blockId, colour, opac, display) ->
      $("#" + blockId).each (index, val) ->
        $(this).remove()
        return

      $("<div id='" + blockId + "' class='block-window'></div>").css
        height: "100%"
        width: "100%"
        "z-index": "4000"
        opacity: opac
        position: "fixed"
        top: "0"
        left: "0"
        display: (if display then "block" else "none")
        "background-color": colour
        "background-image": (if colour is "white" then "url('" + app.settings.apppath + "img/temp-load.gif')" else "")
        "background-repeat": "no-repeat"
        "background-position": "center"


    switchView: (win, path) ->
      return  if win.location.href.indexOf(path) > -1
      $("body").append app.ui.popupBlock("login-block", "white", "1", false)
      $("#login-block").fadeIn 1000, ->
        win.location.replace win.location.pathname + path
        return

      return

  api: (->
    _this = this
    getAllSizes: ->
      (if $.isEmptyObject(app.data.sizes) then $.Deferred().resolve() else $.get("{0}{1}obj/sizes/".format(app.settings.apihost, app.settings.apipath)).success((data, textStatus, jqxhr) ->
        app.util.array2json data.results, app.data.sizes, "id"
        return
      ))

    getAllCategories: ->
      (if $.isEmptyObject(app.data.categories) then $.Deferred().resolve() else $.get("{0}{1}obj/categories/".format(app.settings.apihost, app.settings.apipath)).success((data, textStatus, jqxhr) ->
        app.util.array2json data.results, app.data.categories, "id"
        return
      ))

    getAllPhotos: ->
      (if $.isEmptyObject(app.data.photos) then $.Deferred().resolve() else $.get("{0}{1}obj/photos/".format(app.settings.apihost, app.settings.apipath)).success((data, textStatus, jqxhr) ->
        app.util.array2json data.results, app.data.photos, "id"
        return
      ))

    getAllProducts: ->
      (if $.isEmptyObject(app.data.products) then $.Deferred().resolve() else $.get("{0}{1}obj/products/".format(app.settings.apihost, app.settings.apipath)).success((data, textStatus, jqxhr) ->
        app.util.array2json data.results, app.data.products, "id"
        return
      ))
  )()
  data:
    sizes: {}
    categories: {}
    photos: {}
    products: {}

window.app = app