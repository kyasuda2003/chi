from django.conf.urls import url, include
from rest_framework import routers
from poe.api import views_
from django.contrib import admin
admin.autodiscover()

#from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'users', views_.UserViewSet)
router.register(r'groups', views_.GroupViewSet)
router.register(r'categories',views_.CategoryViewSet)
router.register(r'photos',views_.PhotoViewSet)
router.register(r'accounts',views_.AccountViewSet)
router.register(r'products',views_.ProductViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^obj/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', views_.obtain_auth_token),
    url(r'^media/photos/(?P<filename>[\w,\s-]+\.[A-Za-z]{3})(/(?P<isthumb>[\w,\s]))?', views_.show_picture),
    url(r"^$", views_.index,name='index'),
    url(r'^entry', views_.index, name='index'),
]
