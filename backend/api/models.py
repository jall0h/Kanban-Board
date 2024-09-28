from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):
    """Model used for user authentication, and team member related information."""

    username = models.CharField(
        max_length=30,
        unique=True,
        validators=[RegexValidator(
            regex=r'^@\w{3,}$',
            message='Username must consist of @ followed by at least three alphanumericals'
        )]
    )
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(unique=True, blank=False)

    class Meta:
        """Model options."""
        ordering = ['last_name', 'first_name']

    def full_name(self):
        """Return a string containing the user's full name."""
        return f'{self.first_name} {self.last_name}'
    
class Task(models.Model):
    TASK_STATUS_CHOICES = [
        ("TODO","Todo"),
        ("PROG","In Progress"),
        ("DONE", "Done")
        ]
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=250, blank=True)
    status = models.CharField(max_length=5, choices=TASK_STATUS_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
