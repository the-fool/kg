from django.contrib.auth import get_user_model

from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer, CreateUserSerializer

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        self.serializer_class = CreateUserSerializer
        self.permission_classes = (AllowAny,)
        return super(UserList, self).create(request, *args, **kwargs)

    def get_queryset(self):
        q = User.objects.prefetch_related('affiliations').all()
        return q

class UserDetail(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'username'

    def get_queryset(self):
        q = User.objects.prefetch_related('affiliations').all()
        return q
