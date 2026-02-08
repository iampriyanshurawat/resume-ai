from django.urls import path
from .views import JobDescriptionListCreateAPIView

urlpatterns = [
    path("", JobDescriptionListCreateAPIView.as_view(), name="job-description")
]