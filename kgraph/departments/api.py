from rest_framework import generics, permissions

from .models import Department
from .serializers import DepartmentSerializer

class DepartmentList(generics.ListAPIView):
    model = Department
    serializer_class = DepartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Department.objects.all()
        return queryset
