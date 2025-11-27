from django.shortcuts import render,redirect
from users.forms import UserRegistrationForm
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request, 'index.html', {})

def please_login(request):
    return render(request, 'please_login.html')

def logout(request):
    request.session.flush()
    request.session.clear_expired()
    messages.success(request, "You have been logged out successfully!")
    return redirect('index')

def UserLogin(request):
    return render(request, 'UserLogin.html', {})

def UserRegister(request):
    form = UserRegistrationForm()
    return render(request, 'UserRegistrations.html', {'form': form})

def AdminLogin(request):
    return render(request, 'AdminLogin.html', {})