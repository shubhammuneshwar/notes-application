from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	RetrieveAPIView,
	RetrieveUpdateAPIView
)

from rest_framework.permissions import(
	IsAuthenticatedOrReadOnly
)

from note.serializers import (
	NoteCreateSerializer,
	NoteListSerializer,
	SharedNoteDetailSerializer,
	NoteDetailSerializer
)
from note.models import Note
from note.permissions import IsOwnerOrReadOnly

class NoteCreateView(CreateAPIView):
	serializer_class=NoteCreateSerializer
	def perform_create(self,serializer):
		serializer.save(author=self.request.user)

class NoteDeleteView(DestroyAPIView):
	queryset=Note.objects.all()
	serializer_class=NoteListSerializer
	permission_classes = [IsOwnerOrReadOnly]
	lookup_field='pk'

class NoteListView(ListAPIView):
	serializer_class=NoteListSerializer
	def get_queryset(self):
		return Note.objects.filter(author=self.request.user)

class NoteDetailView(RetrieveAPIView):
	queryset=Note.objects.all()
	serializer_class=NoteListSerializer
	lookup_field='pk'

class NoteUpdateView(RetrieveUpdateAPIView):
	queryset=Note.objects.all()
	serializer_class=NoteCreateSerializer
	permission_classes = [IsOwnerOrReadOnly]
	lookup_field='pk'

class SharedNoteView(RetrieveAPIView):
	serializer_class=SharedNoteDetailSerializer
	lookup_field='unique_id'
	def get_queryset(self):
		uuidkey = self.request.parser_context['kwargs']['unique_id']
		return Note.objects.filter(unique_id=uuidkey)
