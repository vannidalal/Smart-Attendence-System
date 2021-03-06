# Generated by Django 4.0.3 on 2022-04-28 19:35

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('captureAttendance', '0008_employee_department'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.TextField()),
                ('userType', models.TextField(choices=[('EMP', 'Employee'), ('AD', 'Admin'), ('SA', 'SuperAdmin')])),
                ('created', models.DateTimeField(auto_now=True)),
                ('empId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='captureAttendance.employee', to_field='empId')),
            ],
        ),
        migrations.DeleteModel(
            name='Admin',
        ),
    ]
