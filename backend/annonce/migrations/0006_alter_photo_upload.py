# Generated by Django 4.1.5 on 2023-01-26 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("annonce", "0005_alter_annonce_adresse"),
    ]

    operations = [
        migrations.AlterField(
            model_name="photo",
            name="upload",
            field=models.ImageField(upload_to="images"),
        ),
    ]
