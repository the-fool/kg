# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 21:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_auto_20160316_1705'),
    ]

    operations = [
        migrations.AlterField(
            model_name='edge',
            name='whence',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='fore', to='courses.Course'),
        ),
        migrations.AlterField(
            model_name='edge',
            name='whither',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='aft', to='courses.Course'),
        ),
    ]
