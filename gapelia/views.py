from django.core.urlresolvers import reverse
from gapelia.settings import FILEPICKER_API_KEY
from django.template.context import RequestContext
from django.shortcuts import render_to_response, redirect

def home(request):
		context = RequestContext(request)
		context["FILEPICKER_API_KEY"] = FILEPICKER_API_KEY

		if request.user.is_authenticated():
			return redirect(reverse('me'))
			# return redirect(reverse('books'))
		else:
			return render_to_response('index.html', context_instance=context)
