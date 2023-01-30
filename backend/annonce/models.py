from django.db import models
from user.models import User
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser,    BaseUserManager, PermissionsMixin

# Create your models here.

"""class Theme(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name"""
   
class Adresse(models.Model):
    wilaya=models.CharField(max_length=100)
    Commune=models.CharField(max_length=100)
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
        ('college', 'college'),
         ('lycee', 'lycee'),
        ('Primary School','Primary School'),
        ('Middle School','Middle School'),
        ('Secondary School','Secondary School')
    )
    modalité_options = (
        ('offline', 'offline'),
        ('online', 'online'),
        
    )
    theme_options=(
         ('math', 'math'),
        ('science', 'science'),
    )
    year_choices=(
        ('1AP','1AP'),
          ('2AP','2AP'),
            ('3AP','3AP'),
              ('4AP','4AP'),
                ('5AP','5AP'),
            ('1AM','1AM'),
          ('2AM','2AM'),
            ('3AM','3AM'),
              ('4AM','4AM'),
               ('1AS','1AS'),
          ('2AS','2AS'),
            ('3AS','3AS'),
    )
    theme =models.CharField(max_length=50, choices=theme_options
         )
    annoncer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='annoncer')
    title=models.CharField(max_length=100)
    category = models.CharField(
        max_length=40, choices=category_options,)
    year=models.CharField(max_length=7,choices=year_choices,null=True)
    modalite = models.CharField(
        max_length=8, choices=modalité_options,)
    description = models.TextField(max_length=300,blank=True)
    tarif  = models.CharField(max_length=30)
    
    adresse = models.ForeignKey(Adresse,on_delete=models.CASCADE,blank=True,null=True)
   # slug = models.CharField(max_length=80, blank=False, null=False,unique=True)
    published = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.annoncer.email +' '+self.title[:15]
class Photo(models.Model):
    upload = models.ImageField(upload_to = 'images')
    annonce = models.ForeignKey(Annonce,related_name='images',on_delete=models.CASCADE)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Annonce = models.ForeignKey(Annonce, on_delete=models.CASCADE)
class Conversation(models.Model):
    annonce=models.ForeignKey(Annonce,on_delete=models.CASCADE)
    pariticipant1=models.ForeignKey(User, on_delete=models.CASCADE,related_name='pariticipant1')
    pariticipant2=models.ForeignKey(User, on_delete=models.CASCADE,related_name='pariticipant2')
    def __str__(self):
        return self.annonce+' '+self.pariticipant2

class Message(models.Model):
    conversation=models.ForeignKey(Conversation,on_delete=models.CASCADE)
    body=models.CharField(max_length=255)
    sender=models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.body[:10]+' '+self.conversation[:10]