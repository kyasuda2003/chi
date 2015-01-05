from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from poe.api.serializers import UserSerializer, GroupSerializer, CategorySerializer, AccountSerializer, PhotoSerializer, ProductSerializer
from poe.api.models import Account, Photo, Category, Product
import datetime
from django.utils.timezone import utc
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ObtainExpiringAuthToken(ObtainAuthToken):
    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        Token.objects.filter(user=user).delete()
        Token.objects.create(user=user)
        token, created = Token.objects.get_or_create(user=user)
        #newKey=Token.generate_key()
        #Token.objects.filter(user=user).update(key=token.generate_key())
        #if not created:
        # update the created time of the token to keep it valid                                                                                       
        #token.created = datetime.datetime.utcnow().replace(tzinfo=utc)
        #token.save()

        return Response({'token': token.key, 'created':token.created})

obtain_auth_token=ObtainExpiringAuthToken.as_view()

def index(request):
    from django.shortcuts import render
    #latest_question_list = Question.objects.order_by('-pub_date')[:5]
    #context = {'latest_question_list': latest_question_list}
    #return render(request, 'polls/index.html', context)
    return render(request, 'theta/index.django.html')

def show_picture(request, filename, isthumb):
    from django.conf import settings
    from django.http import HttpResponse
    from django.core.servers.basehttp import FileWrapper
    from django.core.exceptions import PermissionDenied
    from sorl.thumbnail.images import ImageFile
    
    from sorl.thumbnail import get_thumbnail
    from sorl.thumbnail import delete

    from django.shortcuts import get_object_or_404
    from poe.api.authentication import ExpiringTokenAuthentication

    import os
    import mimetypes

    #_ref2 = None

    try:
        _ref = request.META['HTTP_AUTHORIZATION']
    except:
        print 'Request.META contains none HTTP_AUTHORIZATION'
        #ExpiringTokenAuthentication.authenticate(request)
    #else:
    #    _ref1 = _ref[_ref.find(' ')+1:]
    #    _ref2 = Token.objects.filter(key=_ref1)
    #    print _ref2

    #print 'Checking permission.'
    #if not request.user.is_authenticated():
    #    raise PermissionDenied

    #print 'Permission granted.'
    filename = filename.replace('/','').replace('\\','');
    filepath = os.path.join(settings.MEDIA_ROOT+settings.UPLOAD_DIR, filename)
    
    conttype = mimetypes.guess_type(filepath)[0]
    print settings.UPLOAD_DIR
    _im = get_object_or_404(Photo, content=settings.UPLOAD_DIR+filename)
    im = _im.content

    if isthumb=='1':
        im = get_thumbnail(_im.content, '110x110', crop='center', quality=99)
        response = HttpResponse(im.read(), content_type=conttype)
        return response

    wrapper = FileWrapper(im.file)
    response = HttpResponse(wrapper, content_type=conttype)
    return response
