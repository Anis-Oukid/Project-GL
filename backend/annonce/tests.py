from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Annonce, Bookmark
from user.models import User


class MyprofileTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@estin.dz', password='testpassword')
        self.client.force_authenticate(user=self.user)
    
    def test_get_profile(self):
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'testuser@estin.dz')
        
    def test_update_profile(self):
        data = {'addresse': 'newAddresse'}
        response = self.client.patch(reverse('profile'), data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['addresse'], 'newAddresse')



class AnnonceTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='testuser@estin.dz',
            password='testpassword'
        )
        self.annonce = Annonce.objects.create(
            title='Test Annonce',
            description='This is a test annonce',
            annoncer=self.user
        )
        self.client.force_authenticate(user=self.user)

    def test_get_all_annonces(self):
        response = self.client.get(reverse('annonce-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Annonce')



    def test_get_annonce_detail(self):
        response = self.client.get(reverse('annonce-detail', args=[self.annonce.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Annonce')
        self.assertEqual(response.data['description'], 'This is a test annonce')
     
    
    def test_delete_annonce(self):
        response = self.client.delete(reverse('annonce-detail', args=[self.annonce.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Annonce.objects.count(), 0)

