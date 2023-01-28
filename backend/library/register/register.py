from rest_framework.authtoken.models import Token

from user.models import User
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def register_social_user(provider, user_id, email, firstname,lastname):
    filtered_user_by_email = User.objects.filter(email=email)

    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].auth_provider:
            new_user = User.objects.get(email=email)

            registered_user = User.objects.get(email=email)
            registered_user.check_password(settings.SOCIAL_SECRET)

            Token.objects.filter(user=registered_user).delete()
            Token.objects.create(user=registered_user)
            new_token = list(Token.objects.filter(
                user_id=registered_user).values("key"))

            return {
                'firstname': registered_user.username.split()[0],
               'lastname': registered_user.username.split()[1],
                'email': registered_user.email,
                'tokens': str(new_token[0]['key'])}

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        user = {
             'email': email,
             'firstname':firstname,
             'lastname':lastname,
            'password': settings.SOCIAL_SECRET
        }
        user = User.objects.create_user(**user)
        user.is_active = True
        user.auth_provider = provider
        user.save()
        new_user = User.objects.get(email=email)
        new_user.check_password(settings.SOCIAL_SECRET)
        Token.objects.create(user=new_user)
        new_token = list(Token.objects.filter(user_id=new_user).values("key"))
        return {
            'email': new_user.email,
            'firstname': new_user.firstname,
            'lastname': new_user.lastname,
            'tokens': str(new_token[0]['key']),
        }
