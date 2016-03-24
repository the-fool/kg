import random

from django.db import IntegrityError, transaction
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
                    success = False
                    while not success:
                        course_number = random.randint(100, 999)
                        course_tier = course_number % 100 + 1
                        try:
                            with transaction.atomic():
                                Course.objects.create(title="{}-{}".format(c1, c2), department=d, course_number=course_number, tier=course_tier)
                                success = True
                        except IntegrityError:
                            pass
