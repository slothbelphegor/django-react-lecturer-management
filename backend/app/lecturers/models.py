from django.db import models
from users.models import CustomUser
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
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    ethnic = models.CharField(max_length=20)
    religion = models.CharField(max_length=30)
    hometown = models.CharField(max_length=100)
    degree = models.CharField(max_length=20)
    title = models.CharField(max_length=20, blank=True)
    title_detail = models.CharField(max_length=100, blank=True)
    title_granted_at = models.DateField()
    address = models.CharField(max_length=100)
    work_position = models.CharField(max_length=100)
    workplace = models.CharField(max_length=100)
    # Ngạch viên chức 
    quota_code = models.CharField(max_length=200)
    salary_coefficient = models.FloatField()
    salary_coefficient_granted_at = models.DateField()
    recruited_at = models.DateField()
    years_of_experience = models.IntegerField()
    exp_academic = models.JSONField(blank=True)
    exp_language = models.TextField(blank=True)
    exp_computer = models.TextField(blank=True)
    exp_work = models.JSONField(blank=True)
    researches = models.JSONField(blank=True)
    published_works = models.JSONField(blank=True)
    subjects = models.ManyToManyField('Subject')
    recommender = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    user = models.OneToOneField(CustomUser, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(db_default="Chưa được duyệt", max_length=100)
  
    def __str__(self):
        return f"{self.name} - {self.workplace}"

class Evaluation(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=2000)
    date = models.DateField()
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.lecturer.name} - {self.date}"
    
class Schedule(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    notes = models.CharField(max_length=500, blank=True, null=True)
    lecturer = models.ForeignKey(Lecturer, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    place = models.CharField(max_length=200)
    
    def __str__(self):
        return f'{self.subject.name} - {self.place}'
    
    
    