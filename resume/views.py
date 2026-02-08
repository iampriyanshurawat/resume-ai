from django.shortcuts import render
from rest_framework.views import APIView
from .models import Resume
from .serializers import ResumeSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from common.pdf_text_extraction import text_extraction_from_pdf

# Create your views here.

class ResumeListAPIView(APIView):

    parser_classes = [MultiPartParser, FormParser] # required for form submissions and file handling

    def get(self, request):
        resumes = Resume.objects.filter(user=request.user).order_by('-created_at')
        serializer = ResumeSerializer(resumes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):

        serializer = ResumeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        resume = serializer.save(user=request.user)
        file_path = resume.file.path
        try:
            extracted_text = text_extraction_from_pdf(file_path)
            resume.extracted_text = extracted_text
            resume.save(update_fields=["extracted_text"])

        except Exception as e:
            return Response({
                "id": resume.id,
                "message": "Uploaded, but text extraction failed",
                "error": str(e)
            }, status=status.HTTP_201_CREATED)
        
        return Response(ResumeSerializer(resume).data, status=status.HTTP_201_CREATED)