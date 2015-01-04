from django.db import models
from django.conf import settings
#from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

from django.contrib.auth.models import User
import os

#for user in User.objects.all():
#    Token.objects.get_or_create(user=user)

#@receiver(post_save, sender=settings.AUTH_USER_MODEL)
#def create_auth_token(sender, instance=None, created=False, **kwargs):
#    if created:
#        Token.objects.create(user=instance)

class Account(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    def __unicode__(self):
        return self.user.username

class Photo(models.Model):
    content = models.ImageField(upload_to=settings.UPLOAD_DIR)
    def filename(self):
        return self.content.name
    def __unicode__(self):
        return os.path.basename(self.content.name)

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __unicode__(self):
        return self.name

class Product(models.Model):
    code = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    case_pack = models.CharField(max_length=20)
    case_length = models.CharField(max_length=20)
    case_width = models.CharField(max_length=20)
    case_height = models.CharField(max_length=20)
    cu_ft = models.FloatField()
    wt_lbs = models.FloatField()
    wt_dim_ups = models.FloatField()
    nmfc = models.IntegerField()
    _class = models.CharField(max_length=50)
    pallet_tie = models.IntegerField()
    pallet_high = models.IntegerField()
    case_pallet = models.IntegerField()
    one_plt_wt = models.FloatField() 
    categories = models.ManyToManyField(Category, verbose_name="list of categories")
    photos = models.ManyToManyField(Photo, verbose_name="list of photos")
    def __unicode__(self):
        return self.code
