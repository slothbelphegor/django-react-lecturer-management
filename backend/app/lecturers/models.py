from django.db import models

# Create your models here.


class Subject(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    credits = models.IntegerField()

    def __str__(self):
        return self.name


class Lecturer(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    workplace = models.CharField(max_length=100)
    
    # Cập nhật: từ ForeignKey -> ManyToManyField
    subjects = models.ManyToManyField('Subject')

    # Thêm recommender (liên kết đến chính model Lecturer)
    recommender = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.workplace}"
