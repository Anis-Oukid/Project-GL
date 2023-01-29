from rest_framework import serializers
from .models import Annonce,Photo,Bookmark,Conversation,Message,Adresse
from user.models import User



class AnnonceImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = "__all__"
class AdresseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adresse
        fields = ('id', 'wilaya', 'Commune', 'latitude', 'longitude')
class AnnonceSerializer(serializers.ModelSerializer):
    images =  AnnonceImageSerializers(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    adresse = AdresseSerializer(required=True)
    class Meta:
        model = Annonce
        fields = ('id', 'annoncer', 'title', 'category','theme', 'modalite', 'description', 'tarif', 'adresse', 'published',"images",
                  "uploaded_images")

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
    
        adresse_data = validated_data.pop('adresse')
        adresse = Adresse.objects.create(**adresse_data)
        annonce = Annonce.objects.create(adresse=adresse.id, **validated_data)

        for image in uploaded_images:
            Photo.objects.create(annonce=annonce, upload=image)

        return annonce
class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ["firstname","lastname",'phonenumber','addresse', "email"]

class BookmarkSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    annonce = serializers.PrimaryKeyRelatedField(queryset=Annonce.objects.all())

    class Meta:
        model = Bookmark
        fields = ('user', 'annonce')
    def create(self, validated_data):
        request = self.context["request"]
        ModelClass = self.Meta.model

        instance = ModelClass.objects.get_or_create(
            **validated_data, **{"user": request.user}
        )
        return instance
class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ('id', 'annonce', 'pariticipant1', 'pariticipant2')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'Conversation', 'body', 'sender')