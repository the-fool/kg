import random

from django.db import IntegrityError, transaction
from django.core.management.base import BaseCommand

from kgraph.courses.models import Course, Edge
from kgraph.departments.models import Department

from kgraph.core.exceptions import CircularDependency

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Edge.objects.all().delete()

        departments = list(Department.objects.all())

        for d in departments:
            courses = list(Course.objects.filter(department=d).all())
            i_range = len(courses) - 1

            for i, c in enumerate(courses):
                # random number of edges per course
                j = 0
                while j < random.randint(0, 3):
                    # get random index
                    k = random.randint(0, i_range)

                    # no self-reference
                    while k == i:
                        k = random.randint(0, i_range)
                    try:
                        with transaction.atomic():
                            Edge.objects.create(whence=courses[k], whither=c)
                            j += 1
                    except IntegrityError:
                        # probably a unique key violation, roll back
                        print(i, k)
                        j -= 1
                    except CircularDependency:
                        j -= 1
