from django.contrib import admin
from .models import Annonce,Theme,Adresse,Photo,Wilaya,Commune

# Register your models here.
@admin.register(Annonce)
class AuthorAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('description',), }
admin.site.register(Theme)
admin.site.register(Adresse)
admin.site.register(Photo)
admin.site.register(Wilaya)
admin.site.register(Commune)
