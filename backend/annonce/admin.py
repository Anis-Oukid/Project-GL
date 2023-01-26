from django.contrib import admin
from .models import Annonce,Adresse,Photo,Bookmark

# Register your models here.
@admin.register(Annonce)
class AuthorAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('description',), }

admin.site.register(Adresse)
admin.site.register(Photo)
admin.site.register(Bookmark)
