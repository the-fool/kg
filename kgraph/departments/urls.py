from django.conf.urls import url, include

from .api import DepartmentList, DepartmentCourseList, DepartmentDetail

department_urls = [
    url(r'^$', DepartmentList.as_view(), name='department-list'),
    url(r'^(?P<pk>[\w-]+)/?$', DepartmentDetail.as_view(), name='department-detail'),
    url(r'^(?P<pk>[\w-]+)/courses/$', DepartmentCourseList.as_view(), name='departmentcourse-list'),
]

urlpatterns = [
    url(r'', include(department_urls)),
]
