from django.urls import path
from .views import *



urlpatterns = [
    path('annonce/<int:pk>/', AnnonceDetail.as_view(), name='annonce-detail'),
    path('', AnnonceList.as_view(), name='annonce-list'),
    path('search/', AnnonceSearch.as_view(), name='search'),
    path('add-bookmark', AddToBookmarks.as_view(), name='addBookmark'),
    path('delete-bookmark', RemoveFromBookmarks.as_view(), name='removeBookmark'),
    path('bookmarks', AllBookmarks.as_view(), name='allBookmarks'),
    path('myprofile', Myprofile.as_view(), name='profile'),
    path('myannonces/',MyAnnonces.as_view(), name='myAnnonces'),
    path('addadresse/',AddAdresse.as_view(), name='create-adresse'),
]

