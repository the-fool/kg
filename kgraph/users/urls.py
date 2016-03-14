# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import api

urlpatterns = [
    # URL pattern for the UserListView
    url(
        regex=r'^$',
        view=api.UserList.as_view(),
        name='user-list'
    ),

    # URL pattern for the UserDetailView
    url(
        regex=r'^(?P<username>[\w.@+-]+)/$',
        view=api.UserDetail.as_view(),
        name='user-detail'
    ),

]
