from django.db import models
from user.models import User
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser,    BaseUserManager, PermissionsMixin

# Create your models here.








class Theme(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name
class Wilaya(models.Model):
    name=models.CharField(max_length=50)
    code=models.CharField(max_length=2)
class Commune(models.Model):
    wilaya=models.ForeignKey(Wilaya,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
class Adresse(models.Model):
    Commune=models.ForeignKey(Commune,on_delete=models.CASCADE)
    latitude = models.DecimalField(
                max_digits=9, decimal_places=6, null=True, blank=True)

    longitude = models.DecimalField(
                max_digits=9, decimal_places=6, null=True, blank=True)

def user_directory_path(instance, filename):
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)
  

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
    title=models.CharField(max_length=80)
    category = models.CharField(
        max_length=10, choices=category_options,)
    modalite = models.CharField(
        max_length=8, choices=modalité_options,)
    description = models.TextField(max_length=300,blank=True)
    tarif  = models.CharField(max_length=30)
    wilaya = models.CharField (max_length=50)
    Commune = models.CharField( max_length=50)
    adresse = models.ForeignKey(Adresse,on_delete=models.CASCADE)
    slug = models.SlugField(max_length=250, unique=True)
    published = models.DateTimeField(default=timezone.now)
    bookmarks =models.ManyToManyField(User, related_name='bookmark',default=None,blank=True)
    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.annoncer.email +' '+self.description[:15]
class Photo(models.Model):
    upload = models.ImageField(upload_to = user_directory_path)
    annonce = models.ForeignKey(Annonce,on_delete=models.CASCADE)