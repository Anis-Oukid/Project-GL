from django.urls import path
from .views import AnnonceList, AnnonceDetail



urlpatterns = [
    path('<int:pk>/', AnnonceDetail.as_view(), name='detailcreate'),
    path('', AnnonceList.as_view(), name='listcreate'),
]