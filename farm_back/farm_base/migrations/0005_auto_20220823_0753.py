# Generated by Django 2.2 on 2022-08-23 07:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('farm_base', '0004_auto_20220823_0313'),
    ]

    operations = [
        migrations.RenameField(
            model_name='farm',
            old_name='owner',
            new_name='owner_id',
        ),
    ]
