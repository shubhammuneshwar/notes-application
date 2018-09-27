from django.conf.urls import url
from note.views import(
	NoteCreateView,
	NoteDetailView,
	NoteDeleteView,
	NoteListView,
	NoteUpdateView,
	SharedNoteView,
)
urlpatterns =  [

	url(r'^$',NoteListView.as_view(),name='List'),
	url(r'^create',NoteCreateView.as_view(),name='Create'),
	url(r'^detail/(?P<pk>[\d-]+)/$',NoteDetailView.as_view(),name='Details'),
	url(r'^update/(?P<pk>[\d-]+)/$',NoteUpdateView.as_view(),name='Update'),
	url(r'^delete/(?P<pk>[\d-]+)/$',NoteDeleteView.as_view(),name='Delete'),
	url(r'^sharednote/(?P<unique_id>[-\w]+)/$',SharedNoteView.as_view(),name='SharedNote'),


]
