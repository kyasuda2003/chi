from django.contrib.auth.models import User, Group
from poe.api.models import Account, Photo, Category, Product
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups','id',)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name','id',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name','id',)

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id','filename',)

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('user','id',)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','code','description','case_pack','case_length','case_width','case_height','cu_ft','wt_lbs','wt_dim_ups','nmfc','_class','pallet_tie','pallet_high','case_pallet','one_plt_wt','categories','photos',)


