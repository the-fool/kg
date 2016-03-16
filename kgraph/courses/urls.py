from django.conf.urls import url, include

from .api import CourseList, CourseDetail

course_urls = [
    url(r'^$', CourseList.as_view(), name='course-list'),
    url(r'^(?P<pk>[\w-]+)/$', CourseDetail.as_view(), name='course-detail')
]

urlpatterns = [
    url(r'', include(course_urls)),
]
