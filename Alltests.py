from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import unittest
import HtmlTestRunner
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time

class LoginTest (unittest.TestCase):
    url = "http://localhost:3000/signin"
    username = {'Saad.imran.vohra@gmail.com': 'TestCase1', 't2': 'Saad.imran.vohra@gmail.com'}
    password = {'t1': 'saad', 't2': '12345'}

    def setUp(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())

        self.driver.maximize_window()
        self.driver.implicitly_wait(10)
    
    def test_Login_Fail_TC01(self):
        driver = self.driver

        driver.get(self.url)
        
        driver.find_element(By.ID, "Email").send_keys(self.username['t1'])
        driver.find_element(By.ID, "Password").send_keys(self.password['t1'])
        driver.find_element(By.ID, "login").click()
        
        self.assertIn('http://localhost:3000', driver.current_url)

    def test_Login_Pass_TC02(self):
        driver = self.driver

        driver.get(self.url)
        
        driver.find_element(By.ID, "Email").send_keys(self.username['t2'])
        driver.find_element(By.ID, "Password").send_keys(self.password['t2'])
        driver.find_element(By.ID, "login").click()
    
        self.assertIn('http://localhost:3000', driver.current_url)

    def test_Logout_Pass_TC03(self):
        driver = self.driver
        driver.get(self.url)

        driver.find_element(By.ID, "Email").send_keys("ammarsiddiqui247@gmail.com")
        driver.find_element(By.ID, "Password").send_keys("12345")
        driver.find_element(By.ID, "login").click()
        time.sleep(3)
        driver.find_element(By.CLASS_NAME, "user-widget").click()
        time.sleep(2)
        driver.find_element(By.ID, "sign-out").click()
        
        self.assertIn('http://localhost:3000/signin', driver.current_url)

    
    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner())
