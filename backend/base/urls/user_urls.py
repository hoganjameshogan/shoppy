
from django.urls import path, include
from base.views import user_views as views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    # TokenRefreshView,
)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name="user_profile"),
    path('profile/update/', views.updateUserProfile, name="user_profile_update"),
    path('register/' , views.registerUser, name="register"),
]