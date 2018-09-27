from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
	message = "You Must be the Author of the note to perform this aaction"
	def has_object_permission(self,request,view,obj):
		return obj.author == request.user