import os

from selenium import webdriver
from django.test import LiveServerTestCase

os.environ['PATH']+=r'C:/SeleniumD'

class CreateAnnonceTest(LiveServerTestCase):
    def setUp(self):
        self.driver = webdriver.ChromeOptions()

    def test_create_annonce(self):
        # Open the website
        self.driver.get(self.live_server_url)

        # Click the "Create Annonce" button
        self.driver.find_element_by_id("newAnnonce").click()

        # Fill in the form fields
        self.driver.find_element_by_id("titleInput").send_keys("Test title")
        self.driver.find_element_by_id("categoryInput").send_keys("primaire")
        self.driver.find_element_by_id("modaliteInput").send_keys("offline")
        self.driver.find_element_by_id("descriptionInput").send_keys("I am a highly experienced math teacher.")
        self.driver.find_element_by_id("tarifInput").send_keys("200da/hour")
        self.driver.find_element_by_id("yearInput").send_keys("200da/hour")
        self.driver.find_element_by_id("wilayaInput").send_keys("Bejaia")
        self.driver.find_element_by_id("CommuneInput").send_keys("Amizour")
      
        self.driver.find_element_by_id("uploadFile").send_keys("https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s")

        # Submit the form
        self.driver.find_element_by_id("annonceSubmitButton").click()

        # Assert that the annonce was successfully created
        self.assertIn("Annonce created successfully", self.driver.page_source)

    def tearDown(self):
        self.driver.quit()