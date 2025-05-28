from django.shortcuts import render
from rest_framework import viewsets, permissions ,status
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .permissions import *

# Create your views here.

class LecturerStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = ['status']


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
        
    @action(detail=False, methods=['get', 'put', 'patch'], permission_classes=[IsAuthenticated])
    def me(self, request):
        try:
            lecturer = Lecturer.objects.get(user=request.user)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)

        if request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(lecturer, data=request.data, partial=(request.method == 'PATCH'))
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        else:
            serializer = self.get_serializer(lecturer)
            return Response(serializer.data)
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated, CanEditLecturerStatus])
    def update_status(self, request, pk=None):
        try:
            lecturer = Lecturer.objects.get(pk=pk)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)
        serializer = LecturerStatusSerializer(lecturer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

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

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Evaluation.objects.all()
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
        except Evaluation.DoesNotExist:
            return Response({"error": "Evaluation not found"}, status=404)
    
    def update(self, request, pk=None):
        try:
            evaluation = self.queryset.get(pk=pk)
        except Evaluation.DoesNotExist:
            return Response({"error": "Evaluation not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(evaluation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Log lỗi nếu có
        print("Update failed:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        try:
            lecturer = Lecturer.objects.get(user=request.user)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)
        evaluations = self.queryset.all()
        serializer = self.serializer_class(evaluations, many=True)
        return Response(serializer.data)
    
    
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework import status

# class EvaluationViewSet(viewsets.ModelViewSet):
#     queryset = Evaluation.objects.all()
#     serializer_class = EvaluationSerializer
#     permission_classes = [permissions.AllowAny]

#     @action(detail=False, methods=["get"], url_path="by-lecturer/(?P<lecturer_id>[^/.]+)")
#     def get_schedules_by_lecturer(self, request, lecturer_id=None):
#         """
#         Custom action to retrieve all lecturers for a given lecturer ID.
#         """
#         try:
#             schedules = self.queryset.filter(lecturer_id=lecturer_id)
#             serializer = self.serializer_class(schedules, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Schedule.DoesNotExist:
#             return Response(
#                 {"error": "Schedule not found"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )
    
class ScheduleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    
    def list(self, request):
        queryset = Schedule.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            queryset = self.queryset.get(pk=pk)
            serializer = self.serializer_class(queryset)
            return Response(serializer.data)
        except Schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=404)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)
    
    def update(self, request, pk=None, partial=False):
        try:
            subject = self.queryset.get(pk=pk)
        except Schedule.DoesNotExist:
            return Response({"error": "Schedule not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(subject, data=request.data, partial=partial)
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
        except Schedule.DoesNotExist:
            return Response({"error": "Subject not found"}, status=404)
    
    
    @action(detail=False, methods=["get"], url_path="by-lecturer/(?P<lecturer_id>[^/.]+)")
    def get_schedules_by_lecturer(self, request, lecturer_id=None):
        try:
            schedules = self.queryset.filter(lecturer_id=lecturer_id)
            serializer = self.serializer_class(schedules, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Lecturer.DoesNotExist:
            return Response(
                {"error": "Lecturer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        try:
            lecturer = Lecturer.objects.get(user=request.user)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)
        schedules = self.queryset.filter(lecturer=lecturer)
        serializer = self.get_serializer(schedules, many=True)
        return Response(serializer.data)
    
    
    
