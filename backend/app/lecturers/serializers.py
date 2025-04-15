from rest_framework import serializers
from .models import *


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


class RecommenderSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = Lecturer
        # Include only the fields you want to expose
        fields = ['name', 'workplace', 'email', 'full_name']
    
    def get_full_name(self, obj):
        # Assuming the full name is a combination of first and last name
        return f"{obj.name} - {obj.workplace}"


class LecturerSerializer(serializers.ModelSerializer):
    # Store the recommender details in a separate field
    recommender_details = RecommenderSerializer(
        source='recommender', read_only=True)
    subject_names = serializers.SerializerMethodField()

    class Meta:
        model = Lecturer
        fields = "__all__"
    
    def get_subject_names(self, obj):
        return [subject.name for subject in obj.subjects.all()]
