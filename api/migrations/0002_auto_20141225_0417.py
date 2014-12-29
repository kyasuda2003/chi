# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('originalFileName', models.CharField(max_length=50)),
                ('content', models.FileField(upload_to=b'./../photos')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='product',
            name='pictures',
        ),
        migrations.DeleteModel(
            name='Picture',
        ),
        migrations.AddField(
            model_name='product',
            name='photos',
            field=models.ManyToManyField(to='api.Photo', verbose_name=b'list of photos'),
            preserve_default=True,
        ),
    ]
