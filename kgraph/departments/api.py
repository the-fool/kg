from rest_framework import generics, permissions

from .models import Department
from .serializers import DepartmentSerializer

from ..courses.models import Course
from ..courses.serializers import CourseSerializer

class DepartmentList(generics.ListAPIView):
    model = Department
    serializer_class = DepartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Department.objects.all()
        return queryset

class DepartmentCourseList(generics.ListAPIView):
    model = Course
    serializer_class = CourseSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Course.objects.select_related('department').all()
        return queryset.filter(department__pk=self.kwargs.get('pk'))
