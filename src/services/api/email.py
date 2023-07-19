from django.core.mail import send_mail
import random
from django.conf import settings
from .models import User


def send_otp_via_email(email, subject):
    otp = random.randint(1000, 9999)
    message = "Your otp is {}".format(otp)
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email])
    user = User.objects.get(email=email)
    user.otp = otp
    user.save()
