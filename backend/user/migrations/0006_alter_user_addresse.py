# Generated by Django 4.1.5 on 2023-01-30 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_alter_user_auth_provider"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="addresse",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]