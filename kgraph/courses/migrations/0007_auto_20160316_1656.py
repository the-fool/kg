# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 16:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_auto_20160316_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='department',
            field=models.ForeignKey(default=uuid.uuid4, on_delete=django.db.models.deletion.SET_DEFAULT, to='departments.Department'),
        ),
    ]
