from django.core.management.base import BaseCommand

from kgraph.courses.models import Course
from kgraph.departments.models import Department


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Course.objects.all().delete()

        departments = list(Department.objects.all())
        courses = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']
        
        for d in departments:
            for c1 in courses:
                for c2 in courses:
                    Course.objects.create(title="{}-{}".format(c1, c2), department=d)
