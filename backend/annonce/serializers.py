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
        fields = "__all__"

class AnnonceSerializer(serializers.ModelSerializer):
    #annoncer = serializers.HiddenField(default=serializers.CurrentUserDefault())
    adresse=AdresseSerializer(many=False,read_only=True)
    images =  AnnonceImageSerializers(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    class Meta:
        model = Annonce
        fields = ('id', 'title', 'category','theme', 'modalite', 'description', 'tarif', 'adresse', 'published',"images",
                  'uploaded_images','year')

    
    def create(self, validated_data):
        print(validated_data)
        uploaded_images = validated_data.pop("uploaded_images") 
        validated_data['annoncer'] = self.context['request'].user
       
        #adresse_data = validated_data.pop('adresse')
        #adresse = Adresse.objects.create(**adresse_data)
        annonce = Annonce.objects.create(**validated_data)

        for image in uploaded_images:
            Photo.objects.create(annonce=annonce, upload=image)

        return annonce
class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ["firstname","lastname",'phonenumber','addresse', "email"]

class BookmarkSerializer(serializers.ModelSerializer):
    #user = UserSerializer(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    Annonce=AnnonceSerializer(read_only=True)
    #annonce = serializers.PrimaryKeyRelatedField(queryset=Annonce.objects.all())

    class Meta:
        model = Bookmark
        fields = "__all__"
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Bookmark.objects.create(**validated_data)
class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ('id', 'annonce', 'pariticipant1', 'pariticipant2')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'Conversation', 'body', 'sender')