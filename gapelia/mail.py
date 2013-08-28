import smtplib
import mimetypes
from email.MIMEText import MIMEText
from email.mime.multipart import MIMEMultipart

from django.conf import settings
from django.core.mail import EmailMessage
from django.template import Context, Template

EMAIL_TEMPLATES = {'password-reset': (settings.FORGOT_PASSWORD, 'Password reset on Gapelia'),
                   'signup-invitation': (settings.SIGNUP_INVITATION, 'Welcome to Gapelia!'),
                   }

def _get_mail_content(template_path, **kwargs):
    content = open(template_path, 'r').read().strip()
    t = Template(content)
    c = Context(kwargs)
    return t.render(c)

def send_email(to_email, template_key, **kwargs):
    """A generic function to send notificational emails through SMTP.
    """
    template_path, subject = EMAIL_TEMPLATES.get(template_key)
    mail_content = _get_mail_content(template_path, **kwargs)

    message = MIMEMultipart()
    message['From'] = settings.DEFAULT_FROM_EMAIL
    message['To'] = to_email
    message['Subject'] = subject
    messageBody = MIMEText(mail_content, 'html')
    message.attach(messageBody)

    connectServer = smtplib.SMTP()
    connectServer.connect(settings.EMAIL_HOST, settings.EMAIL_PORT)
    connectServer.ehlo()
    connectServer.starttls()
    connectServer.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    connectServer.sendmail(settings.DEFAULT_FROM_EMAIL, to_email, message.as_string())
    connectServer.quit()
