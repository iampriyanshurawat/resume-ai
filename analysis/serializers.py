from .models import AnalysisResult
from rest_framework import serializers

class AnalysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnalysisResult
        fields = [
            "id",
            "resume",
            "job_description",
            "score",
            "matching_skills",
            "missing_skills",
            "suggestions",
            "raw_response",
            "created_at",
        ]

        read_only_fields = ["id", "raw_response", "created_at"]

class AnalysisHistorySerializer(serializers.ModelSerializer):
    
    resume_file_url = serializers.CharField(source="resume.file.url", read_only=True)
    job_title = serializers.CharField(source="job_description.title", read_only=True)
    company = serializers.CharField(source="job_description.company", read_only=True)


    class Meta:
        model = AnalysisResult
        fields = [
            "id",
            "resume",
            "job_description",
            "score",
            "matching_skills",
            "missing_skills",
            "suggestions",
            "raw_response",
            "created_at",
            "resume_file_url",
            "job_title",
            "company",
        ]
        read_only_fields = fields