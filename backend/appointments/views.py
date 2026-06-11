from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from .models import Appointment
from .serializers import AppointmentSerializer

def send_appointment_email(appointment, new_status):
    patient_email = appointment.patient.email
    doctor_name = f"Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}"
    patient_name = f"{appointment.patient.first_name} {appointment.patient.last_name}"

    if new_status == 'accepted':
        subject = '✅ Appointment Confirmed — HealthCare+'
        message = f"""
Dear {patient_name},

Great news! Your appointment has been confirmed.

Appointment Details:
- Doctor: {doctor_name}
- Date: {appointment.date}
- Time: {appointment.time}
- Reason: {appointment.reason}

Please arrive 10 minutes early.

Best regards,
HealthCare+ Team
        """
    elif new_status == 'rejected':
        subject = '❌ Appointment Update — HealthCare+'
        message = f"""
Dear {patient_name},

Unfortunately, your appointment request has been declined.

Appointment Details:
- Doctor: {doctor_name}
- Date: {appointment.date}
- Time: {appointment.time}

Please book a new appointment at a different time.

Best regards,
HealthCare+ Team
        """
    elif new_status == 'completed':
        subject = '🏁 Appointment Completed — HealthCare+'
        message = f"""
Dear {patient_name},

Your appointment with {doctor_name} has been marked as completed.

We hope you received great care. Please don't hesitate to book again.

Best regards,
HealthCare+ Team
        """
    else:
        return

    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [patient_email])
    except Exception as e:
        print(f"Email error: {e}")

class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        u = self.request.user
        return Appointment.objects.filter(doctor=u) if u.role == 'doctor' else Appointment.objects.filter(patient=u)

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        u = self.request.user
        return Appointment.objects.filter(doctor=u) if u.role == 'doctor' else Appointment.objects.filter(patient=u)

class UpdateAppointmentStatusView(generics.UpdateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(doctor=self.request.user)

    def patch(self, request, *args, **kwargs):
        appointment = self.get_object()
        new_status = request.data.get('status')
        if new_status not in ['accepted', 'rejected', 'completed']:
            return Response({'error': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)
        appointment.status = new_status
        appointment.notes = request.data.get('notes', appointment.notes)
        appointment.save()
        send_appointment_email(appointment, new_status)
        return Response(AppointmentSerializer(appointment).data)