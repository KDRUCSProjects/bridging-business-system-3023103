# Generated by Django 4.2.1 on 2023-07-25 13:06

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_advertisement"),
    ]

    operations = [
        migrations.RenameField(
            model_name="businessprofile",
            old_name="business_name",
            new_name="businessName",
        ),
    ]
