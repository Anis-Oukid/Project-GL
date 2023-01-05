import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
website2='https://dz.professeurparticulier.com/'
website='https://www.ouedkniss.com/services-ecoles-formations?keywords=cours-soutien-scolaire'
website3='https://www.seleniumeasy.com/comment/reply/245#comment-form'
os.environ['PATH']+=r'C:/SeleniumD'
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver=webdriver.Chrome(options=options)
driver.get(website)
className='v-responsive__content'
driver.implicitly_wait(30)
my_element = driver.find_elements(By.CLASS_NAME,className)
print(my_element.get_attribute('outerHTML'))
