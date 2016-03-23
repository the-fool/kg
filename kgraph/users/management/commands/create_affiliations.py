from django.core.management.base import BaseCommand
from kgraph.users.models import User
from kgraph.departments.models import Membership, Department

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        users = User.objects.all()
        departments = Department.objects.all()

        for i, u in enumerate(users):
            d_mod = len(departments)
            m = Membership(user=u, department=departments[i % d_mod])
            m.save()
            m = Membership(user=u, department=departments[(i + 1) % d_mod])
            m.save()
