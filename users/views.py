import pickle
from django.shortcuts import redirect, render
from .forms import UserRegistrationForm
from django.contrib import messages
from .models import UserRegistrationModel
from django.conf import settings
import os
import matplotlib
matplotlib.use('Agg')   # IMPORTANT FIX
import matplotlib.pyplot as plt
import numpy as np
from django.conf import settings
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import confusion_matrix
import seaborn as sns
import joblib 
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from django.core.files.storage import FileSystemStorage
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model


def user_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if 'loggeduser' not in request.session:
            return redirect('please_login')  
        return view_func(request, *args, **kwargs)
    return wrapper

def UserRegisterActions(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "You have been successfully registered To Login wait until the Admin Approve's")
            form = UserRegistrationForm()
            return render(request, 'UserRegistrations.html', {'form': form})
        else:
            messages.success(request, 'Email or Mobile Already Existed')
    else:
        form = UserRegistrationForm()
    return render(request, 'UserRegistrations.html', {'form': form})


def UserLoginCheck(request):
    if request.method == "POST":
        loginid = request.POST.get('loginid', '').strip()
        pswd = request.POST.get('pswd', '').strip()

        try:
            check = UserRegistrationModel.objects.get(loginid__iexact=loginid, password=pswd)
            status = check.status.strip().lower()

            if status == "activated":
                request.session['id'] = check.id
                request.session['loggeduser'] = check.Username
                request.session['loginid'] = check.loginid
                request.session['email'] = check.email
                return redirect('UserHome')
            else:
                messages.warning(request, 'Your account has not yet been activated by admin.')
                return render(request, 'UserLogin.html')
        except UserRegistrationModel.DoesNotExist:
            messages.warning(request, 'Invalid Login ID or Password.')
        except Exception as e:
            messages.error(request, 'An unexpected error occurred.')

    return render(request, 'UserLogin.html')

@user_login_required
def UserHome(request):
    return render(request, 'users/UserHome.html', {})

@user_login_required
def training(request):

    model = load_model(os.path.join(settings.MEDIA_ROOT, "Potato_Leaves_model.keras"), compile=False)
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

    history_path = os.path.join(settings.MEDIA_ROOT, "history/training_history.npy")
    history = np.load(history_path, allow_pickle=True).item()

    dataset_path = os.path.join(settings.MEDIA_ROOT, "dataset")
    IMG_SIZE = (224, 224)

    gen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

    val_data = gen.flow_from_directory(
        dataset_path,
        target_size=IMG_SIZE,
        batch_size=32,
        subset="validation",
        class_mode="categorical",
        shuffle=False
    )

    loss, acc = model.evaluate(val_data)

    preds = model.predict(val_data)
    y_pred = np.argmax(preds, axis=1)
    y_true = val_data.classes
    labels = list(val_data.class_indices.keys())


    cm = confusion_matrix(y_true, y_pred)
    cm_path = os.path.join(settings.MEDIA_ROOT, "cm.png")

    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, cmap="Greens", fmt="g",
                xticklabels=labels, yticklabels=labels)
    plt.savefig(cm_path)
    plt.close()

    acc_img = os.path.join(settings.MEDIA_ROOT, "accuracy_curve.png")
    plt.figure(figsize=(6,4))
    plt.plot(history['accuracy'], label="Train Accuracy")
    plt.plot(history['val_accuracy'], label="Val Accuracy")
    plt.legend()
    plt.title("Accuracy Curve")
    plt.savefig(acc_img)
    plt.close()

    loss_img = os.path.join(settings.MEDIA_ROOT, "loss_curve.png")
    plt.figure(figsize=(6,4))
    plt.plot(history['loss'], label="Train Loss")
    plt.plot(history['val_loss'], label="Val Loss")
    plt.legend()
    plt.title("Loss Curve")
    plt.savefig(loss_img)
    plt.close()

    return render(request, "users/training.html", {
        "accuracy": round(acc * 100, 2),
        "loss": round(loss, 4),
        "cm_img": settings.MEDIA_URL + "cm.png",
        "acc_img": settings.MEDIA_URL + "accuracy_curve.png",
        "loss_img": settings.MEDIA_URL + "loss_curve.png",
    })

MODEL_PATH = os.path.join('media', 'Potato_Leaves_model.keras')
model = tf.keras.models.load_model(MODEL_PATH, compile=False,safe_mode=False)


class_names = ['Early Blight', 'Late Blight', 'Healthy']
@user_login_required
def prediction(request):
    context = {}

    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_file = request.FILES['image']

        fs = FileSystemStorage()
        file_path = fs.save(uploaded_file.name, uploaded_file)
        img_path = fs.path(file_path)

        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        pred = model.predict(img_array)[0]
        cls = np.argmax(pred)
        conf = pred[cls] * 100

        result = f"{class_names[cls]} ({conf:.2f}% confidence)"

        context = {
            "file_url": fs.url(file_path),
            "result": result
        }

    return render(request, 'users/predict.html', context)