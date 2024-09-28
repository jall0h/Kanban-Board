
from django.contrib import admin
from django.urls import include, path
from .views import TaskView

urlpatterns = [
    path("tasks", TaskView.as_view(), name="tasks"),
]
