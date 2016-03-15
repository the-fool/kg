import uuid
from django.db import models

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, default="nameless")

class Edge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    whence = models.ForeignKey(Course, on_delete=models.DO_NOTHING, related_name="fore")
    whither = models.ForeignKey(Course, on_delete=models.DO_NOTHING, related_name="aft")

    class Meta:
        unique_together = ('whence', 'whither')
