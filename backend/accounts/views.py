from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, MedicalHistory
from .serializers import RegisterSerializer, UserSerializer, MedicalHistorySerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get_object(self):
        return self.request.user

class DoctorListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        qs = User.objects.filter(role='doctor').select_related('doctor_profile')
        spec = self.request.query_params.get('specialization')
        if spec:
            qs = qs.filter(doctor_profile__specialization=spec)
        return qs

class DoctorProfileUpdateView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class MedicalHistoryView(generics.ListCreateAPIView):
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return MedicalHistory.objects.filter(patient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class MedicalHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MedicalHistorySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return MedicalHistory.objects.filter(patient=self.request.user)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh'])
            token.blacklist()
            return Response({'message': 'Logged out.'})
        except:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)