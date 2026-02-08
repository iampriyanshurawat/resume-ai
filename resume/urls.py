from django.urls import path
from .views import ResumeListAPIView


urlpatterns = [
    path('', ResumeListAPIView.as_view(), name='resume_list_create')
]