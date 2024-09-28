
from django.contrib import admin
from django.urls import include, path
from .views import TasksView, TaskView

urlpatterns = [
    path("tasks", TasksView.as_view(), name="tasks_view"),
    path("tasks/<int:pk>", TaskView.as_view(), name="task_view"),
]
