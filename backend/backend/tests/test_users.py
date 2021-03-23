from django.contrib.auth import get_user_model
from django.test import TestCase

class UserTests(TestCase):

    def create_sample_user(email='sampleuser@sample.com', password='a123456'):
        """Initiates sample user for tests"""
        return get_user_model().objects.create(email,password)

    def test_user_register(self):
        """Test that a user can be registered"""
        email = 'sampleuser@sample.com'
        password = 'a123456'

        print("{} : {}".format(email,password))

        user = get_user_model().objects.create_user(
            username = email,
            password = password
        )
        self.assertEqual(user.username, email)
        self.assertTrue(user.check_password(password))

    def test_user_login(self):
        """Test user login success with valid credentials"""

