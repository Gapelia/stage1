stage1
======

Code repository of Gapelia´s first private beta version, also referred to as Stage 1.


## STEPS to set up the application. This app is basically built using [Python](http://www.python.org/) with [Django](https://www.djangoproject.com/) framework.

1. Checkout to dev branch and pull the latest code.
2. Set up python, virtualenv and pip. [Reference to set up on windows](http://www.tylerbutler.com/2012/05/how-to-install-python-pip-and-virtualenv-on-windows-with-powershell/)
3. Activate virtualenv - $ `source env/activate`
4. Create a local_settings.py file within /gapelia/gapelia/ where settings.py is kept.
5. Install dependencies: $ `./bin/pip install -r requirements.pip`
6. Run syncdb - $ `python manage.py syncdb`
7. Run local server - $ `python manage.py runserver`

Now, the app will be serving at this location: http://localhost:8000/
