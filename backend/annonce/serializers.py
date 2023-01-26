from rest_framework import serializers
from .models import Annonce,Photo,Bookmark
from user.models import User



class AnnonceImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"

class AnnonceSerializer(serializers.ModelSerializer):
    bookmarks = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)
    images =  AnnonceImageSerializers(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = Annonce
        fields = ('id', 'annoncer', 'title', 'category','theme', 'modalite', 'description', 'tarif', 'adresse', 'slug', 'published',"images",
                  "uploaded_images",'bookmarks')

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        annonce = Annonce.objects.create(**validated_data)

        for image in uploaded_images:
            Photo.objects.create(annonce=annonce, upload=image)

        return annonce

class BookmarkSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    annonce = serializers.PrimaryKeyRelatedField(queryset=Annonce.objects.all())

    class Meta:
        model = Bookmark
        fields = ('user', 'annonce')