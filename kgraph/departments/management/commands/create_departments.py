from django.core.management.base import BaseCommand
from kgraph.departments.models import Department

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Department.objects.all().delete()
        departments = ['Computer Science', 'Mathematics']
        for d in departments:
            Department.objects.create(title=d)
