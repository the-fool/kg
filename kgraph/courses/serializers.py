from rest_framework import serializers

from .models import Course, Edge

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'title')

class EdgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Edge
        fields = ('id',)
