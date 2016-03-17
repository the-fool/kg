from rest_framework import serializers

from .models import Course, Edge
from ..departments.serializers import DepartmentSerializer

class EdgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Edge
        fields = ('id', 'whence', 'whither')

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    fore = EdgeSerializer(many=True)

    class Meta:
        model = Course
        fields = ('id', 'title', 'department')

class CourseEdgeSerializer(serializers.ModelSerializer):
    fore = EdgeSerializer(many=True)
    aft = EdgeSerializer(many=True)
    
    class Meta:
        model = Course
        fields = ('id', 'title', 'fore', 'aft')
