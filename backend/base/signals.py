from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender,instance,**kwargs):
    # print('this cannot be the easiest way of doing this??')
    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User)