# Generated by Django 5.2.4 on 2025-07-25 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_proyecto_publicado'),
    ]

    operations = [
        migrations.AddField(
            model_name='educacion',
            name='publicado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='experiencia',
            name='publicado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='perfil',
            name='publicado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='tecnologia',
            name='publicado',
            field=models.BooleanField(default=False),
        ),
    ]
