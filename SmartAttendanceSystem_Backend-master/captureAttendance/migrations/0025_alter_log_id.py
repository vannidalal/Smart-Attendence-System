# Generated by Django 4.0.3 on 2022-05-01 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('captureAttendance', '0024_alter_user_companyid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]
