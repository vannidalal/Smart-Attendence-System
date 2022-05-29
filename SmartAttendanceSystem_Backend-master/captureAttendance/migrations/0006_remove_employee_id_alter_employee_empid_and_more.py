# Generated by Django 4.0.3 on 2022-03-29 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('captureAttendance', '0005_employee'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='id',
        ),
        migrations.AlterField(
            model_name='employee',
            name='empId',
            field=models.TextField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='employee',
            name='name',
            field=models.TextField(default='DEFAULT_Name'),
        ),
    ]