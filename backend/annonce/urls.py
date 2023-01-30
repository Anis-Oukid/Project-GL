from django.urls import path
from .views import *



urlpatterns = [
    path('<int:pk>/', AnnonceDetail.as_view(), name='annonceDetail'),
    path('', AnnonceList.as_view(), name='listCreate'),
    path('search/', AnnonceSearch.as_view(), name='search'),
    path('add-bookmark', AddToBookmarks.as_view(), name='addBookmark'),
    path('bookmarks/<int:pk>/', RemoveFromBookmarks.as_view(), name='removeBookmark'),
    path('bookmarks', AllBookmarks.as_view(), name='allBookmarks'),
    path('myprofile', Myprofile.as_view(), name='profile'),
    path('myannonces/',MyAnnonces.as_view(), name='myAnnonces')
]

