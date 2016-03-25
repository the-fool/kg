import uuid
import datetime

from django.db import models

from ..departments.models import Department


class Epoch(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="epochs")
    start_date = models.DateField()
    end_date = models.DateField()
    active = models.BooleanField(default=False)

    # Override
    def save(self, *args, **kwargs):
        today = datetime.date.today()
        if self.start_date <= today and self.end_date > today:
            self.active = True
        super(Epoch, self).save(*args, **kwargs)
