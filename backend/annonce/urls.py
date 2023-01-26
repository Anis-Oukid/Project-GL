from django.urls import path
from .views import AnnonceList, AnnonceDetail,AddToBookmarks,RemoveFromBookmarks,AllBookmarks



urlpatterns = [
    path('<int:pk>/', AnnonceDetail.as_view(), name='annonceDetail'),
    path('', AnnonceList.as_view(), name='listCreate'),
    path('add-bookmark', AddToBookmarks.as_view(), name='addBookmark'),
    path('bookmarks/<int:pk>/', RemoveFromBookmarks.as_view(), name='removeBookmark'),
    path('bookmarks', AddToBookmarks.as_view(), name='allBookmarks'),

]