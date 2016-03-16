from rest_framework import generics, permissions

from .models import Course
from .serializers import CourseSerializer

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Course
    serializer_class = CourseSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self, *args, **kwargs):
        return Course.objects.all()

class CourseList(generics.ListCreateAPIView):
    model = Course
    serializer_class = CourseSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self, *args, **kwargs):
        return Course.objects.all()
