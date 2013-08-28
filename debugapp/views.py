from django.views.generic import View
from django.template.context import RequestContext
from django.shortcuts import render_to_response


class DebugView(View):
    def get(self, request):
        context = RequestContext(request)
        return render_to_response(
            'debug.html', context_instance=context)

    def post(self, request):
        pass
