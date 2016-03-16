from rest_framework import serializers

from .models import Course, Edge
from ..departments.serializers import DepartmentSerializer

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Course
        fields = ('id', 'title', 'department')

class EdgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Edge
        fields = ('id',)
