from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (RegisterView, ProfileView, DoctorListView,
                    LogoutView, MedicalHistoryView, MedicalHistoryDetailView,
                    DoctorProfileUpdateView)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('doctors/', DoctorListView.as_view()),
    path('doctor/profile/', DoctorProfileUpdateView.as_view()),
    path('medical-history/', MedicalHistoryView.as_view()),
    path('medical-history/<int:pk>/', MedicalHistoryDetailView.as_view()),
]