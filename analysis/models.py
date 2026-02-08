from django.db import models
from django.contrib.auth.models import User
from resume.models import Resume
from jobs.models import JobDescription
# Create your models here.

class AnalysisResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="analysis_result")
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="analysis_result")
    job_description = models.ForeignKey(JobDescription, on_delete=models.CASCADE, related_name="analysis_result")

    score = models.IntegerField()

    matching_skills = models.JSONField(default=list, blank=True)
    missing_skills = models.JSONField(default=list, blank=True)
    

    suggestions = models.TextField(blank=True)
    raw_response = models.JSONField(default=dict, blank=True) #Instead of breaking the response into many columns, we store the whole thing as-is.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis({self.id}) score = {self.score}"