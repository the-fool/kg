import uuid
from django.db import models

from ..departments.models import Department

def get_default_department():
    return str(Department.objects.first().id)

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, default="nameless")
    department = models.ForeignKey(Department, on_delete=models.DO_NOTHING, default=get_default_department())

class Edge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    whence = models.ForeignKey(Course, on_delete=models.DO_NOTHING, related_name="fore")
    whither = models.ForeignKey(Course, on_delete=models.DO_NOTHING, related_name="aft")

    class Meta:
        unique_together = ('whence', 'whither')
