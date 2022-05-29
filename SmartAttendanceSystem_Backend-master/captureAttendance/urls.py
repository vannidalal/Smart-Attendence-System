# from rest_framework import routers
# from .api import ImageViewSet
from .views import ImageAPIView, UserAPIView, LogsAPIView, LoginApiView, RefreshTokenAPIView, CompanyAPIView, CompanyApprovalAPIView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
# router = routers.DefaultRouter()
# router.register('api/image', ImageViewSet, 'image')

urlpatterns = [
    path('api/image', ImageAPIView.as_view(), name='image_post'),
    # path('api/image/<str:id>', ImageAPIView.as_view(), name='image_get'),
    path('api/login', LoginApiView.as_view(),
         name='login_obtain_token_pair'),
    path('api/login/refresh', RefreshTokenAPIView.as_view(),
         name='login_token_refresh'),
    path('api/user', UserAPIView.as_view(), name='user'),
    path('api/user/<str:companyId>', UserAPIView.as_view(), name='user'),
    path('api/user/<str:companyId>/<str:userId>',
         UserAPIView.as_view(), name='user_get_single'),
    path('api/company', CompanyAPIView.as_view(), name='get_all_companies'),
    path('api/company/<str:companyId>',
         CompanyAPIView.as_view(), name='get_all_companies'),
    path('api/log', LogsAPIView.as_view(), name='add_lods'),
    path('api/log/<str:companyId>', LogsAPIView.as_view(), name='log_company'),
    path('api/log/<str:companyId>/<str:userId>',
         LogsAPIView.as_view(), name='log_user'),
    path('api/superuser/approve',
         CompanyApprovalAPIView.as_view(), name='approve_company')
]
