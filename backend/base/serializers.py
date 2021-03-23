from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # fields = '__all__'
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_isAdmin(self,obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']

    token = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)

       