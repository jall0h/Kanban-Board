from django.shortcuts import render
from .serializers import UserSerializer, TaskSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Task
from rest_framework import status
from rest_framework.response import Response
# Create your views here.


class TasksView(ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_queryset(self):
        user = self.request.user
        tasks = Task.objects.filter(user=user)
        return tasks
    def get(self,request):
        data = super().get(request).data
        count = len(data)
        return Response(status=status.HTTP_200_OK, data={"data": data, "count" : count })
    def post(self, request):
        try:
            user = request.user
            name = request.data["name"]
            description = request.data["description"]
            task = Task.objects.create(
                user = user,
                name = name,
                description = description,
            )
            serializer = TaskSerializer(task)
            return Response(status=status.HTTP_200_OK, data={"data": serializer.data, "message" : "Successfully created new Task"})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': f'{e} Error creating a new task, Please try again!'})
    
      
            
class TaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_queryset(self):
        user = self.request.user
        tasks = Task.objects.filter(user=user)
        return tasks