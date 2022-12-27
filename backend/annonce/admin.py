from django.contrib import admin
from .models import Annonce,Theme
# Register your models here.
@admin.register(Annonce)
class AuthorAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('description',), }
admin.site.register(Theme)
