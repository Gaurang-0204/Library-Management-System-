from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReaderViewSet, BookViewSet, get_readers, update_reader_bag, checkout_books,add_to_bag, get_checked_out_books, return_book,add_book,get_genres,add_member,issue_book,issued_books,SearchReaderView,SignUpView,LoginView,DashboardStatsView,delete_books,delete_readers

# Create the router for API viewsets
router = DefaultRouter()
router.register(r'readers', ReaderViewSet, basename='readers')
router.register(r'books', BookViewSet, basename='books')

# Include both the router URLs and the custom 'My Bag' functionality URLs
urlpatterns = [
    # Include the routes from the router for the viewsets
    path('', include(router.urls)),

    # Endpoint to get reader details by ID
    # path('reader/<int:reader_id>/', get_reader_by_id, name='get_reader_by_id'),

    # Endpoint to update the reader's bag (Add or Remove books)
    path('reader/<int:reader_id>/update_bag/', update_reader_bag, name='update_reader_bag'),

    # Add book to the reader's bag
    path('reader/<int:reader_id>/add_to_bag/', add_to_bag, name='add_to_bag'),

    # Endpoint to handle book checkout
    path('reader/<int:reader_id>/checkout/', checkout_books, name='checkout_books'),
    
    path('reader/<int:reader_id>/checked_out_books/', get_checked_out_books, name='get_checked_out_books'),

    path('reader/<int:reader_id>/return_book/<int:book_id>/', return_book, name='return_book'),

    path('add-book/', add_book, name='add-book'),
    path('genres/', get_genres, name='get-genres'),
    path('api/readers/', get_readers, name='get-readers'),
    path('add-member/', add_member, name='add-member'),
     path("issue-book/", issue_book, name="issue_book"),
     path('issued-books/', issued_books, name='issued_books'),
    path('return-book/<int:id>/', return_book, name='return_book'),
    path('search-readers/', SearchReaderView.as_view(), name='search-readers'),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("dashboard-stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path('delete/', delete_books, name='delete_books'),
     path('members/', delete_readers, name='delete-readers'),
    


]



