from django.contrib.auth import authenticate
from .models import User
import os
import random
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings



def register_social_user(provider, user_id, email, name):
    filtered_user_by_email = User.objects.filter(email=email)
    
    if filtered_user_by_email.exists():

        if provider == filtered_user_by_email[0].auth_provider:

            registered_user = authenticate(
                email=email, password=settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET)

            return {
              
                'email': registered_user.email,
                'firstname':registered_user.firstname,
                 'lastname':registered_user.lastname,
                'tokens': registered_user.tokens()}

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
       
        user = {
            'email': email,
               'firstname':name.split()[0],
                 'lastname':name.split()[1],
            'password': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET}
        user = User.objects.create_user(**user)
        user.is_verified = True
        user.auth_provider = provider
        user.save()

        new_user = authenticate(
            email=email, password=settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET)
        return {
            'email': new_user.email,
           'firstname':new_user.firstname,
            'lastname':new_user.lastname,
            'tokens': new_user.tokens()
        }