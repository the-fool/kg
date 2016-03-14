# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.core.urlresolvers import reverse_lazy
from django.views import defaults as default_views
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView

from kgraph.departments import urls as department_urls
from kgraph.users import urls as user_urls

api_urls = [
    url(r'^departments/', include(department_urls)),
    url(r'^user/', include(user_urls)),
]

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name="home"),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, include(admin.site.urls)),

    # REST  framework
    url(r'^api/v1/', include(api_urls)),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

    # REST auth app
    url(r'^rest-auth/', include('rest_auth.urls'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception("Bad Request!")}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception("Permission Denied")}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception("Page not Found")}),
        url(r'^500/$', default_views.server_error),
    ]
