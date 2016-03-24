import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from kgraph.core.exceptions import CircularDependency
from ..departments.models import Department

def get_default_department():
    d = Department.objects.first()
    if d:
        return str(d.id)
    else:
        return str(uuid.uuid4())

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course_number = models.IntegerField(default=0, validators=[MaxValueValidator(10000), MinValueValidator(1)])
    tier = models.IntegerField(default=0, validators=[MaxValueValidator(16), MinValueValidator(1)])
    title = models.CharField(max_length=128, default="nameless")
    department = models.ForeignKey(Department, on_delete=models.SET_DEFAULT, null=True, default=None, db_index=True)

    class Meta:
        unique_together = (('department', 'course_number'), ('department','title'))

class Edge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    whence = models.ForeignKey(Course, null=True, on_delete=models.CASCADE, related_name="fore")
    whither = models.ForeignKey(Course, null=True, on_delete=models.CASCADE, related_name="aft")

    class Meta:
        unique_together = (('whence', 'whither'),)

    #Override
    def save(self, *args, **kwargs):
        if self.is_circular():
            raise CircularDependency
        super(Edge, self).save(*args, **kwargs)

    def is_circular(self):
        return self.edge_chase(start_node=self.whence)

    def edge_chase(self, start_node=None):
        for edge in self.whither.fore.all():
            if edge.whither == start_node:
                return True
            else:
                return edge.edge_chase(start_node=start_node)
        return False
