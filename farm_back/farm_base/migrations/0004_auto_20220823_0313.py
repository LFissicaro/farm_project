# Generated by Django 2.2 on 2022-08-23 03:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('farm_base', '0003_auto_20220823_0308'),
    ]

    operations = [
        migrations.RenameField(
            model_name='farm',
            old_name='owner_id',
            new_name='owner',
        ),
    ]
