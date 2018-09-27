from django.conf import settings
from django.db import models
import uuid

class Note(models.Model):
	author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
	title = models.CharField(max_length=100)
	content = models.TextField(max_length=40000)
	published = models.DateTimeField(auto_now_add=True)
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False)

	def __str__(self):
		return str(self.title)
