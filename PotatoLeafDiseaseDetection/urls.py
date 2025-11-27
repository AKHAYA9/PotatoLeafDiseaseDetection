"""
URL configuration Potato Leaf Disease Detection project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from admins import views as admins
from django.urls import path
from users import views as usr
from . import views as mainView
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('',mainView.index, name='index'),
    path("UserRegister/", mainView.UserRegister, name="UserRegister"),
    path("AdminLogin/", mainView.AdminLogin, name="AdminLogin"),
    path('index/', mainView.index, name='index'),
    path("UserLogin/", mainView.UserLogin, name="UserLogin"),
    path('logout/', mainView.logout, name='logout'),
    path('please-login/', mainView.please_login, name='please_login'),

    ### User Side Views
    path("UserRegisterActions/", usr.UserRegisterActions, name="UserRegisterActions"),
    path("UserLoginCheck/", usr.UserLoginCheck, name="UserLoginCheck"),
    path("UserHome/", usr.UserHome, name="UserHome"),
    path("training/", usr.training, name="training"),
    path("prediction/", usr.prediction, name="prediction"),

    ### Admin Side Views
    path("AdminLoginCheck/", admins.AdminLoginCheck, name="AdminLoginCheck"),
    path("AdminHome/", admins.AdminHome, name="AdminHome"),
    path("ViewRegisteredUsers/", admins.ViewRegisteredUsers, name="ViewRegisteredUsers"),
    path("AdminActivaUsers/", admins.AdminActivaUsers, name="AdminActivaUsers"),
    path("DeleteUsers/", admins.DeleteUsers, name="DeleteUsers"),


]
urlpatterns += staticfiles_urlpatterns()
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
