from django.shortcuts import redirect, render
from django.contrib import messages
from users.models import UserRegistrationModel

def AdminLoginCheck(request):
    if request.method == 'POST':
        usrid = request.POST.get('loginid')
        pswd = request.POST.get('pswd')
        if usrid == 'admin' and pswd == 'admin':
            return redirect('AdminHome') 
        elif usrid == 'Admin' and pswd == 'Admin':
            return redirect('AdminHome') 
        else:
            messages.warning(request, 'Please Check Your Login Details')

    return render(request, 'AdminLogin.html', {})


def ViewRegisteredUsers(request):
    data = UserRegistrationModel.objects.all()
    return render(request, 'admins/RegisteredUsers.html', {'data': data})


def AdminActivaUsers(request):
    if request.method == 'GET':
        id = request.GET.get('uid')
        status = 'activated'
        print("PID = ", id, status)
        UserRegistrationModel.objects.filter(id=id).update(status=status)
        data = UserRegistrationModel.objects.all()
        return render(request, 'admins/RegisteredUsers.html', {'data': data})


def AdminHome(request):
    total_users = UserRegistrationModel.objects.count()
    active_users = UserRegistrationModel.objects.filter(status='activated').count()
    pending_approvals = UserRegistrationModel.objects.filter(status='waiting').count()

    context = {
        'total_users': total_users,
        'active_users': active_users,
        'pending_approvals': pending_approvals,
    }
    return render(request, 'admins/AdminHome.html', context)

def DeleteUsers(request):
    if request.method == 'GET':
        id = request.GET.get('uid')
        UserRegistrationModel.objects.filter(id=id).delete()
        data = UserRegistrationModel.objects.all()
        return redirect('ViewRegisteredUsers')