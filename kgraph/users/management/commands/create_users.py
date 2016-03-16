from django.core.management.base import BaseCommand
from kgraph.users.models import User

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User.objects.all().delete()

        users = ['One', 'Two', 'Three', 'Four', 'Five']
        for u in users:
            new_user = User(username=u, email="{}@example.com".format(u))
            new_user.set_password('password')
            new_user.save()
