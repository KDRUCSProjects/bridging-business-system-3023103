# Generated by Django 4.1.1 on 2023-05-19 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="productcolor",
            name="product_id",
        ),
        migrations.RemoveField(
            model_name="productimage",
            name="url",
        ),
        migrations.AddField(
            model_name="payment",
            name="order",
            field=models.OneToOneField(
                default=2, on_delete=django.db.models.deletion.CASCADE, to="api.order"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="product",
            name="color",
            field=models.ManyToManyField(blank=True, null=True, to="api.productcolor"),
        ),
        migrations.AddField(
            model_name="productimage",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="image/"),
        ),
        migrations.CreateModel(
            name="Ratting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ratting_stars", models.IntegerField(default=0)),
                (
                    "business",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.business"
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.product"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "recever",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="recever",
                        to="api.business",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sender",
                        to="api.business",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ContactUs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField()),
                ("create_at", models.DateTimeField(auto_now_add=True)),
                (
                    "business",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.business"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BusinessFavoriteProduct",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "business",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.business"
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.product"
                    ),
                ),
            ],
        ),
    ]