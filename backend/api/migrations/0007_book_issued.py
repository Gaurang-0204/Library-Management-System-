# Generated by Django 5.1.1 on 2025-02-09 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_customuser_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='issued',
            field=models.BooleanField(default=False),
        ),
    ]
