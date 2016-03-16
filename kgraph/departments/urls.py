from django.conf.urls import url, include

from .api import DepartmentList, DepartmentCourseList

department_urls = [
    url(r'^$', DepartmentList.as_view(), name='department-list'),
    url(r'^(?P<pk>[\w-]+)/courses/$', DepartmentCourseList.as_view(), name='departmentcourse-list'),
]

urlpatterns = [
    url(r'', include(department_urls)),
]
