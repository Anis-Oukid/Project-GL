from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Theme(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name 
class Annonce(models.Model):

    category_options = (
        ('primaire', 'primaire'),
        ('collège', 'collège'),
         ('lycée ', 'lycée '),
    )
    modalité_options = (
        ('offline ', 'offline '),
        ('online ', 'online '),
        
    )
    Theme =models.ForeignKey(
        Theme,on_delete=models.RESTRICT  )
    annoncer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='annonces')
    category = models.CharField(
        max_length=10, choices=category_options,)
    modalite = models.CharField(
        max_length=8, choices=modalité_options,)
    description = models.TextField(max_length=300,blank=True)
    tarif  = models.CharField(max_length=30)
    wilaya = models.CharField (max_length=50)
    Commune = models.CharField( max_length=50)
    adresse = models.CharField(blank=True, max_length=50)
    slug = models.SlugField(max_length=250, unique=True)
    published = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.annoncer.email +' '+self.description[:15]