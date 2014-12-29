from django.db import models
from django.conf import settings
#from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

#for user in User.objects.all():
#    Token.objects.get_or_create(user=user)

#@receiver(post_save, sender=settings.AUTH_USER_MODEL)
#def create_auth_token(sender, instance=None, created=False, **kwargs):
#    if created:
#        Token.objects.create(user=instance)

class Size(models.Model):
    name = models.CharField(max_length=50)
    def __unicode__(self):
        return self.name

class Photo(models.Model):
    originalFileName = models.CharField(max_length=50)
    content = models.ImageField(upload_to='./photos')
    def __unicode__(self):
        return self.originalFileName

class Product(models.Model):
    name = models.CharField(max_length=50) 
    code = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    size = models.ManyToManyField(Size, verbose_name="list of sizes")
    photos = models.ManyToManyField(Photo, verbose_name="list of photos")
    def __unicode__(self):
        return self.name
