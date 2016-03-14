from django.conf.urls import url, include

from .api import DepartmentList

department_urls = [
    url(r'^$', DepartmentList.as_view(), name='department-list')
]

urlpatterns = [
    url(r'', include(department_urls)),
]
