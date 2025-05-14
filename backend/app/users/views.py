from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from knox.models import AuthToken


User = get_user_model()

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username_or_email = serializer.validated_data['username_or_email']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username_or_email, 
                                password=password)
            if user:
                _, token = AuthToken.objects.create(user)
                return Response({
                    'user': {
                    'username': user.username,
                    'email': user.email,
                },
                'token': token
                })
            return Response({'error': 'Invalid credentials'}, status=400)   
        return Response(serializer.errors, status=400)   
    
    
class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Return the User except the password since it is write only
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class UserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    Model View Set for Group
    """

    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    pagination_class = None
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_field = "pk"
    http_method_names = ("get", "post", "patch", "delete")

    def list(self, request, *args, **kwargs):
        return super().list(request, fields=("id", "name"), *args, **kwargs)
    
