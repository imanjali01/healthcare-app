from django.urls import path
from .views import AppointmentListCreateView, AppointmentDetailView, UpdateAppointmentStatusView

urlpatterns = [
    path('', AppointmentListCreateView.as_view(), name='appointments'),
    path('<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('<int:pk>/status/', UpdateAppointmentStatusView.as_view(), name='appointment-status'),
]