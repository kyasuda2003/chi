import datetime
from django.utils.timezone import utc
from rest_framework.authentication import TokenAuthentication,get_authorization_header
from rest_framework import exceptions

from django.contrib.auth import authenticate

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            if key == 'AnonymousUser':
                token = self.model.objects.get(user_id=-1)
                return (token.user, token)
            else:
                token = self.model.objects.get(key=key)

        except self.model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        utc_now = datetime.datetime.utcnow().replace(tzinfo=utc)

        if token.created < utc_now - datetime.timedelta(hours=24):
            raise exceptions.AuthenticationFailed('Token has expired')

        return (token.user, token)

    def authenticate(self, request):
        
        auth = get_authorization_header(request).split()
        
        if not auth or auth[0].lower() != b'token':
            return self.authenticate_credentials('AnonymousUser')

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header. Token string should not contain spaces.'
            raise exceptions.AuthenticationFailed(msg)
            
        return self.authenticate_credentials(auth[1])

    def authenticate_header(self, request):
        return 'Token'
