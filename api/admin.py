from django.contrib import admin

from poe.api.models import Size, Category, Photo, Product

#@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    pass

#@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

#@admin.register(Picture)
class PhotoAdmin(admin.ModelAdmin):
    pass

#@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

admin.site.register(Size, SizeAdmin)
admin.site.register(Category, SizeAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Product, ProductAdmin)
