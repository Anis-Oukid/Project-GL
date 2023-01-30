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
        self.driver.find_element_by_id("create_annonce_button").click()

        # Fill in the form fields
        self.driver.find_element_by_id("id_title").send_keys("Test title")
        self.driver.find_element_by_id("id_category").send_keys("primaire")
        self.driver.find_element_by_id("id_modalite").send_keys("offline")
        self.driver.find_element_by_id("id_description").send_keys("I am a highly experienced math teacher.")
        self.driver.find_element_by_id("id_tarif").send_keys("200da/hour")
        self.driver.find_element_by_id("id_wilaya").send_keys("Bejaia")
        self.driver.find_element_by_id("id_Commune").send_keys("Amizour")
      

        # Submit the form
        self.driver.find_element_by_id("submit_button").click()

        # Assert that the annonce was successfully created
        self.assertIn("Annonce created successfully", self.driver.page_source)

    def tearDown(self):
        self.driver.quit()