from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

class Product(models.Model):
    """Model for store products"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=255, null=True,blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    numReviews = models.IntegerField(default=0,null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    countInStock = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Review(models.Model):
    """Individual product reviews"""
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    rating = models.IntegerField(default=0,null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    """Details regarding individual orders"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=255, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True , blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True , blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItems(models.Model):
    """Individual items in order"""
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    qty = models.IntegerField(default=0,null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    _id = models.AutoField(primary_key=True,editable=False )

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    """Customer shipping address"""
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postalCode = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    _id = models.AutoField(primary_key=True,editable=False )

    def __str__(self):
        return str(self.address)





