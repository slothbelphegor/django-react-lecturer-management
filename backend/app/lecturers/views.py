from django.shortcuts import render
from rest_framework import viewsets, permissions ,status
from .serializers import *
from .models import *
from rest_framework.response import Response

# Create your views here.


class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Lecturer.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            queryset = self.queryset.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        try:
            lecturer = self.queryset.get(pk=pk)
            serializer = self.serializer_class(lecturer, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)
    
    def destroy(self, request, pk=None):
        try:
            lecturer = self.queryset.get(pk=pk)
            lecturer.delete()
            return Response(status=204)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Subject.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def retrieve(self, request, pk=None):
        try:
            queryset = self.queryset.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=404)
    
    def update(self, request, pk=None):
        try:
            subject = self.queryset.get(pk=pk)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Log lỗi nếu có
        print("Update failed:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            subject = self.queryset.get(pk=pk)
            subject.delete()
            return Response(status=204)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=404)
    
    
