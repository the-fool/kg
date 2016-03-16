from django.core.management.base import BaseCommand
from kgraph.users.models import User
from kgraph.departments.models import Membership, Department

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        users = User.objects.all()
        departments = Department.objects.all()

        for u in users:
            m = Membership(user=u, department=departments[0])
            m.save()
            m = Membership(user=u, department=departments[1])
            m.save()
