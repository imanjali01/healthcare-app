from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (('patient', 'Patient'), ('doctor', 'Doctor'))
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')
    phone = models.CharField(max_length=15, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True)
    blood_group = models.CharField(max_length=5, blank=True)
    emergency_contact = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class DoctorProfile(models.Model):
    SPECIALIZATION_CHOICES = [
        ('general', 'General Physician'),
        ('cardiology', 'Cardiology'),
        ('dermatology', 'Dermatology'),
        ('neurology', 'Neurology'),
        ('orthopedics', 'Orthopedics'),
        ('pediatrics', 'Pediatrics'),
        ('psychiatry', 'Psychiatry'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=50, choices=SPECIALIZATION_CHOICES, default='general')
    experience_years = models.IntegerField(default=0)
    bio = models.TextField(blank=True)
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    available_days = models.CharField(
        max_length=100,
        default='Monday,Tuesday,Wednesday,Thursday,Friday'
    )
    available_time_start = models.TimeField(default='09:00')
    available_time_end = models.TimeField(default='17:00')
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialization}"


class MedicalHistory(models.Model):
    RECORD_TYPES = [
        ('diagnosis', 'Diagnosis'),
        ('prescription', 'Prescription'),
        ('lab_result', 'Lab Result'),
        ('surgery', 'Surgery'),
        ('allergy', 'Allergy'),
        ('vaccination', 'Vaccination'),
        ('other', 'Other'),
    ]
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medical_history')
    record_type = models.CharField(max_length=20, choices=RECORD_TYPES, default='other')
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    doctor_name = models.CharField(max_length=100, blank=True)
    hospital = models.CharField(max_length=200, blank=True)
    attachment = models.FileField(upload_to='medical_records/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.patient.username} - {self.title}"