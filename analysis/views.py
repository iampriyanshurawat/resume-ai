from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from jobs.models import JobDescription
from resume.models import Resume
from common.openai_service import analyze_resume_vs_jd
from .models import AnalysisResult
from .serializers import AnalysisSerializer, AnalysisHistorySerializer
# Create your views here.

class AnalyzeAPIView(APIView):
    def post(self, request):
        resume_id = request.data.get("resume_id")
        jd_id = request.data.get("job_description_id")

        if not resume_id or not jd_id:
            return Response(
                {"detail": "resume_id and job_description_id are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        resume = Resume.objects.filter(id = resume_id, user = request.user).first()
        jd = JobDescription.objects.filter(id = jd_id, user = request.user).first()

        if not resume:
            return Response({"detail": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
        if not jd:
            return Response({"detail": "Job description not found."}, status=status.HTTP_404_NOT_FOUND)

        result = analyze_resume_vs_jd(resume.extracted_text, jd.description)

        data = result["data"]
        raw = result["raw"]

        analysis = AnalysisResult.objects.create(
            user = request.user,
            resume = resume,
            job_description = jd,
            score = data["score"],
            matching_skills=data["matching_skills"],
            missing_skills=data["missing_skills"],
            suggestions=data["suggestions"],
            raw_response=raw,
        )
        return Response(AnalysisSerializer(analysis).data, status=status.HTTP_201_CREATED)
    
class AnalyzeHistoryAPIView(APIView):

    def get(self, request):

        analyses = (
        AnalysisResult.objects
        .filter(user=request.user)
        .select_related("resume", "job_description")
        .order_by("-created_at")
        )
        serializer = AnalysisHistorySerializer(analyses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
