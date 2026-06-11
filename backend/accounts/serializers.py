from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, DoctorProfile, MedicalHistory

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    doctor_profile = DoctorProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name',
                  'role', 'phone', 'profile_picture', 'date_of_birth',
                  'address', 'blood_group', 'emergency_contact', 'doctor_profile']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    specialization = serializers.CharField(required=False)
    experience_years = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name',
                  'last_name', 'role', 'phone', 'specialization', 'experience_years']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        spec = validated_data.pop('specialization', 'general')
        exp = validated_data.pop('experience_years', 0)
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        if user.role == 'doctor':
            DoctorProfile.objects.create(user=user, specialization=spec, experience_years=exp)
        return user

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = '__all__'
        read_only_fields = ['patient', 'created_at']