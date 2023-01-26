from django.contrib import admin
from .models import Annonce,Adresse,Photo,Bookmark

# Register your models here.
admin.site.register(Annonce)


admin.site.register(Adresse)
admin.site.register(Photo)
admin.site.register(Bookmark)
