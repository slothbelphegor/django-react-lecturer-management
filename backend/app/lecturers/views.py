from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth.models import Group
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
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        lecturer_group = Group.objects.filter(name='lecturer').first()
        queryset = Lecturer.objects.filter(
            Q(user__groups=lecturer_group) |
            Q(user=None)
        )
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def all(self, request):
        queryset = Lecturer.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def potential_lecturers(self, request):
        # Get the group object for 'potential_lecturer'
        potential_group = Group.objects.filter(name='potential_lecturer').first()
        queryset = Lecturer.objects.filter(
            Q(status="Chưa duyệt hồ sơ") |
            Q(user__groups=potential_group)
        ).distinct()
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
        
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def sign_contract(self, request, pk=None):
        """
        Set lecturer status to 'Đã ký hợp đồng' and add user to 'lecturer' group.
        """
        try:
            lecturer = self.get_queryset().get(pk=pk)
        except Lecturer.DoesNotExist:
            return Response({"error": "Lecturer not found"}, status=404)

        # Set status
        lecturer.status = "Đã ký hợp đồng"
        lecturer.save()

        # Add user to 'lecturer' group if not already
        if lecturer.user:
            lecturer_group, _ = Group.objects.get_or_create(name='lecturer')
            if not lecturer.user.groups.filter(name='lecturer').exists():
                lecturer.user.groups.set([lecturer_group])
                lecturer.user.save()

        serializer = self.get_serializer(lecturer)
        return Response(serializer.data)
    
    def partial_update(self, request, pk=None):
        try:
            lecturer = self.queryset.get(pk=pk)
            serializer = LecturerStatusSerializer(lecturer, data=request.data)
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
        
    @action(detail=False, methods=['get', 'put', 'patch', 'post'])
    def me(self, request):
        try:
            lecturer = Lecturer.objects.get(user=request.user)
        except Lecturer.DoesNotExist:
            # User has not been assigned to any user -> Create a new lecturer for the user
            data = request.data.copy()
            data['user'] = request.user.id
            serializer = self.serializer_class(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

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
    
    
    
