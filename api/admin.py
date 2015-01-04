from django.contrib import admin

from poe.api.models import Category, Photo, Product, Account

class AccountAdmin(admin.ModelAdmin):
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

admin.site.register(Account, AccountAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Product, ProductAdmin)
