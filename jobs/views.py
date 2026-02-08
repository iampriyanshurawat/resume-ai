from django.shortcuts import render
from .serializers import JobDescriptionSerializer
from rest_framework.views import APIView
from .models import JobDescription
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class JobDescriptionListCreateAPIView(APIView):
    
    def get(self, request):
        JDs = JobDescription.objects.filter(user=request.user).order_by("-created_at")
        return Response(JobDescriptionSerializer(JDs, many=True).data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = JobDescriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        JD = serializer.save(user=request.user)
        return Response(JobDescriptionSerializer(JD).data, status=status.HTTP_201_CREATED)
