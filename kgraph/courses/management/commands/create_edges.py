from django.core.management.base import BaseCommand
from kgraph.courses.models import Course, Edge
from kgraph.departments.models import Department

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Edge.objects.all().delete()

        departments = list(Department.objects.all())

        for d in departments:
            courses = list(Course.objects.filter(department=d).all())
            for i, _ in enumerate(courses):
                if (i == 0): continue
                Edge.objects.create(whence=courses[-(i+1)], whither=courses[-i])
