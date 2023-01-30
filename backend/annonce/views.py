from rest_framework import generics,filters,permissions,status
from .models import Annonce,Bookmark
from .serializers import AnnonceSerializer,BookmarkSerializer,UserSerializer
from django_filters.rest_framework import DjangoFilterBackend
from user.models import User
from rest_framework.response import Response
#from .webscraper.scrap import scrape_by_domain



class Myprofile(generics.RetrieveUpdateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class = UserSerializer
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    def get_object(self):
        return self.request.user

class AnnonceList(generics.ListCreateAPIView):
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    
    def perform_create(self, serializer):
        serializer.save(annoncer=self.request.user)

class AnnonceDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
class MyAnnonces(generics.ListAPIView):
    def get_queryset(self):
        user = self.request.user
        return Annonce.objects.filter(annoncer=user.id)
    serializer_class=AnnonceSerializer
class AnnonceSearch(generics.ListAPIView):
    permission_classes=[permissions.AllowAny]
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer
    filter_backends=[DjangoFilterBackend]
    search_fields=('adresse__Commune','' 'adresse__wilaya', 'title', 'category','theme', 'modalite', 'description', 'tarif','published')
    filterset_fields=['adresse__Commune', 'adresse__wilaya', 'title', 'category','theme', 'modalite', 'description', 'tarif','published']
class AddToBookmarks(generics.CreateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    def perform_create(self, serializer):
        annonce_id = self.request.data.get('annonce')
        annonce = Annonce.objects.get(id=annonce_id)
        serializer.save(user=self.request.user, Annonce=annonce)

class RemoveFromBookmarks(generics.DestroyAPIView):
    permission_classes=[permissions.IsAuthenticated]
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    def delete(self, request, *args, **kwargs):
        annonce_id = self.request.data.get('annonce')
        annonce = Annonce.objects.get(id=annonce_id)
        user = request.user

        bookmark = self.queryset.filter(Annonce=annonce, user=user)

        if not bookmark.exists():
            return Response({"error": "Bookmark does not exist"},
                            status=status.HTTP_404_NOT_FOUND)

        bookmark.delete()
        return Response({"message": "Bookmark removed successfully"})

class AllBookmarks(generics.ListAPIView):
    permission_classes=[permissions.IsAuthenticated]
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)
    


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""