from rest_framework import generics, permissions

from .models import Department
from .serializers import DepartmentSerializer

class DepartmentList(generics.ListAPIView):
    model = Department
    serializer_class = DepartmentSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
