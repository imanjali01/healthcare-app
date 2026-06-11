from rest_framework import serializers
from .models import Appointment
from accounts.serializers import UserSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    patient_details = UserSerializer(source='patient', read_only=True)
    doctor_details = UserSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['patient', 'status', 'created_at', 'updated_at']