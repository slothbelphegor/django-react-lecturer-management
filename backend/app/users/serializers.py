from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username_or_email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        # Hides from the response when the user is created
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
        