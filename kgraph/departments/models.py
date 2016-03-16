import uuid
from django.db import models
from django.utils import timezone

from ..users.models import User

class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, default="nameless")
    members = models.ManyToManyField(User, through="Membership", related_name="affiliations")

class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date_joined = models.DateField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_joined = timezone.now()
        return super(Membership, self).save(*args, **kwargs)
