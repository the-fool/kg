import random
import datetime

from django.db import IntegrityError, transaction
from django.core.management.base import BaseCommand

from kgraph.departments.models import Department
from kgraph.epochs.models import Epoch

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        Epoch.objects.all().delete()

        departments = list(Department.objects.all())
        dates = [
            datetime.date(2015,1,15),
            datetime.date(2015,6,15),
            datetime.date(2016,1,15),
            datetime.date(2016,6,15),
            datetime.date(2017,1,15),
            datetime.date(2017,6,15)
        ]
        for department in departments:
            for date in dates:
                end_date = date + datetime.timedelta(days=180)
                Epoch.objects.create(
                    department=department,
                    start_date=date,
                    end_date=end_date)
