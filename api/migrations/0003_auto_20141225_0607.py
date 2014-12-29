# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20141225_0417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='content',
            field=models.ImageField(upload_to=b'./photos'),
            preserve_default=True,
        ),
    ]
