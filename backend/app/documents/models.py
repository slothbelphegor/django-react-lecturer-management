from django.db import models

# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=100)
    file_link = models.URLField(max_length=200)
    published_at = models.DateTimeField(null=True, blank=True)
    valid_at = models.DateTimeField(null=True, blank=True)
    published_by = models.CharField(max_length=100, null=True, blank=True)
    signed_by = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name