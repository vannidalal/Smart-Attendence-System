# Generated by Django 4.0.3 on 2022-04-28 21:59

import captureAttendance.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('captureAttendance', '0011_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(null=True, upload_to=captureAttendance.models.path_and_rename),
        ),
    ]
