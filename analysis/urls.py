from django.urls import path, include
from .views import AnalyzeAPIView,AnalyzeHistoryAPIView


urlpatterns = [
    path('', AnalyzeAPIView.as_view(), name="analyze"),
    path('history/', AnalyzeHistoryAPIView.as_view(), name="analyze_history"),

]