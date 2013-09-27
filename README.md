phoenix branch
=

All right, I'm writing this over from scratch because the previous instructions were asinine and left out a lot of key information. Here's what you need to do if you are on Windows:

 1. Dependencies are [Python](http://www.python.org), [Django](https://www.djangoproject.com), [Python Imaging Library](http://pythonware.com/products/pil), [pip](https://sites.google.com/site/pydatalog/python/pip-for-windows), and [Graphviz](http://graphviz.org). Download the 32-bit installers if there is an option for x86/x64. Please note that Python must be installed before PIL.

 3. Checkout to phoenix branch and pull latest code.

 4. Open terminal, CD into the requirements folder, and install everything. You will have to CD into the plugin subfolders too.

 5. Create a local_settings.py file within /gapelia/ where settings.py is kept.

 6. Run dependency script: $ `./bin/pip install -r requirements.pip`

 7. Run syncdb: $ `python manage.py syncdb`

 8. Run local server: $`python manage.py runserver`

BOOM goes the dynamite: [http://localhost:8000](http://localhost:8000
)

Aside: If there any errors that say `command not found`, make sure your PATH is updated. Quickest way to access PATH on Windows 8 is to right-click `My Computer`, select `Properties`, click `Advanced System Settings`, click `Environment Variables`, and you will see it in the `System Variables` scroll menu. `C:\Python27\Scripts` should be in the PATH.

Any other errors pop up? Idk, troubleshoot and pray to the TRON gods. You can also check out [https://pypi.python.org/pypi](https://pypi.python.org/pypi) in case some Python modules are not installed.

*Keeping old instructions, just in case...<br/><br/>
Code repository of Gapelia's first private beta version, codenamed stage1.<br/><br/>
0. Dependencies are [Python](http://www.python.org) and [Django](https://www.djangoproject.com).<br/>
1. Checkout to dev branch and pull the latest code.<br/>
2. Set up python, virtualenv and pip. [Reference to set up on windows](http://www.tylerbutler.com/2012/05/how-to-install-python-pip-and-virtualenv-on-windows-with-powershell)<br/>
3. Activate virtualenv - $ `source env/activate`<br/>
4. Create a local_settings.py file within /gapelia/gapelia/ where settings.py is kept.<br/>
5. Install dependencies: $ `./bin/pip install -r requirements.pip`<br/>
6. Run syncdb - $ `python manage.py syncdb`<br/>
7. Run local server - $ `python manage.py runserver`<br/><br/>
BOOM goes the dynamite: http://localhost:8000*