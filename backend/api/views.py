from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import reader, Book  # Use 'reader' (lowercase)
from .serializers import ReaderSerializer, BookSerializer
from django.utils.timezone import now
from .models import Genre


# ReaderViewSet for handling CRUD operations via REST API
class ReaderViewSet(viewsets.ModelViewSet):
    queryset = reader.objects.all()  # Use lowercase 'reader'
    serializer_class = ReaderSerializer

# BookViewSet for handling CRUD operations via REST API
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

# Function to get all books
def get_books(request):
    books = Book.objects.all()
    book_list = [
        {"id": book.id, "title": book.title, "author": book.author, "published": book.published}
        for book in books
    ]
    return JsonResponse(book_list, safe=False)

# Function to add a book to the reader's bag
def add_to_bag(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.added_to_bag = True
    book.save()
    return JsonResponse({"message": "Book added to bag!"}, status=200)

# # Get reader details by ID
# def get_reader_by_id(request, reader_id):
#     try:
#         reader_obj = reader.objects.get(id=reader_id)  
#         return JsonResponse({
#             'name': reader_obj.reader_name,
#             'contact': reader_obj.reader_contact,
#             'reference_id': reader_obj.reference_id,
#         }, status=200)
#     except reader.DoesNotExist:
#         return JsonResponse({'error': 'Reader not found'}, status=404)

# Update reader's bag (Add/Remove books)
def update_reader_bag(request, reader_id):
    reader_obj = get_object_or_404(reader, id=reader_id) 
    
    if request.method == "POST":
        # Add a book to the reader's bag
        book_id = request.data.get('book_id')  
        book = get_object_or_404(Book, id=book_id)
        reader_obj.books_in_bag.add(book)
        return JsonResponse({'message': 'Book added to bag'}, status=200)
    
    if request.method == "DELETE":
        # Remove a book from the reader's bag
        book_id = request.data.get('book_id') 
        book = get_object_or_404(Book, id=book_id)
        reader_obj.books_in_bag.remove(book)
        return JsonResponse({'message': 'Book removed from bag'}, status=200)

# API to checkout all books in the reader's bag
@api_view(['POST'])
def checkout_books(request, reader_id):
    try:
        reader = Reader.objects.get(id=reader_id)
        books = Book.objects.filter(id__in=request.data['books'])

        for book in books:
            # Check if the book is available for checkout
            if book.is_checked_out:
                return Response({"error": f"{book.title} is already checked out."}, status=status.HTTP_400_BAD_REQUEST)

            # Mark the book as checked out
            book.is_checked_out = True
            book.save()

            # Create a new checkout record
            CheckoutRecord.objects.create(reader=reader, book=book, due_date=request.data['due_date'])

        return Response({"message": "Books checked out successfully!"}, status=status.HTTP_200_OK)
    except Reader.DoesNotExist:
        return Response({"error": "Reader not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API to add books to the reader's bag
@api_view(['POST'])
def add_to_bag(request, reader_id):
    reader_obj = get_object_or_404(reader, id=reader_id)  # Use lowercase 'reader'
    book_id = request.data.get('book_id')

    if not book_id:
        return Response({'error': 'Book ID is required'}, status=400)

    book = get_object_or_404(Book, id=book_id)
    reader_obj.books_in_bag.add(book)  # Add the book to the reader's bag
    reader_obj.save()

    return Response({'message': f'Book "{book.title}" added to the bag.'}, status=200)

# @api_view(['POST'])
# def return_book(request, reader_id, book_id):
#     try:
#         reader_obj = reader.objects.get(id=reader_id)
#         book = Book.objects.get(id=book_id)
#         reader_obj.books_in_bag.remove(book)

#         return JsonResponse({'message': f'Book "{book.title}" has been returned.'}, status=200)
#     except reader.DoesNotExist:
#         return JsonResponse({'error': 'Reader not found'}, status=404)
#     except Book.DoesNotExist:
#         return JsonResponse({'error': 'Book not found'}, status=404)


@api_view(['GET'])
def get_checked_out_books(request, reader_id):
    try:
        reader_obj = reader.objects.get(id=reader_id)
        checked_out_books = reader_obj.books_in_bag.all()
        
        # Assuming you have fields for rental_date and return_date (You might need to update your models)
        checked_out_books_data = [
            {
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'published': book.published,
                'rental_date': 'July 1, 2023, 5:34 p.m.',  # Example: Make sure these dates are in your data
                'expected_return_date': 'July 20, 2023, 5:34 p.m.'
            } for book in checked_out_books
        ]

        return JsonResponse({
            'reader_name': reader_obj.reader_name,
            'reader_id': reader_obj.id,
            'checked_out_books': checked_out_books_data
        }, status=200)
    except reader.DoesNotExist:
        return JsonResponse({'error': 'Reader not found'}, status=404)
    

from django.http import JsonResponse
from .models import Book, reader

def get_books(request):
    books = Book.objects.all()
    book_list = [
        {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "published": book.published,
            "issued": reader.objects.filter(books_in_bag=book).exists(),  # Check if book is issued
        }
        for book in books
    ]
    return JsonResponse(book_list, safe=False)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer

@api_view(['POST'])
def add_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

from .serializers import GenreSerializer

@api_view(['GET'])
def get_genres(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import reader
from api.serializers import ReaderSerializer

@api_view(['GET'])
def get_readers(request):
    readers = Reader.objects.all()
    serializer = ReaderSerializer(readers, many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import reader
from .serializers import ReaderSerializer

@api_view(['POST'])
def add_member(request):
    serializer = ReaderSerializer(data=request.data)

    if serializer.is_valid():
        reader_instance = serializer.save()  # Save the new reader
        reader_instance.books_in_bag.set(request.data.get("books_in_bag", []))  # Properly set Many-to-Many field
        return Response({"message": "Member added successfully!", "data": ReaderSerializer(reader_instance).data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.dateparse import parse_date
from api.models import reader, Book, IssueBook  # Ensure correct capitalization

@csrf_exempt  # Placed correctly above the function
def issue_book(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received Data:", data)  # Debugging print

            # Fetch reader and book instances
            reader_instance = reader.objects.get(reference_id=data["reference_id"])
            book_instance = Book.objects.get(title=data["book"])

            # Parse issue_date and due_date
            issue_date = parse_date(data.get("issue_date"))
            due_date = parse_date(data.get("due_date"))

            if not issue_date or not due_date:
                return JsonResponse({"error": "Invalid or missing issue_date/due_date"}, status=400)

            # Add book to reader's bag
            reader_instance.books_in_bag.add(book_instance)

            # Create an IssueBook record
            issue = IssueBook.objects.create(
                reader=reader_instance,
                book=book_instance,
                issue_date=issue_date,
                due_date=due_date
            )

            print("Book Issued Successfully:", issue)

            return JsonResponse(
                {"message": "Book issued successfully!", "issue_id": issue.id}, status=201
            )

        except reader.DoesNotExist:
            return JsonResponse({"error": "Reader not found"}, status=400)
        except Book.DoesNotExist:
            return JsonResponse({"error": "Book not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)




from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import IssueBook
from .serializers import IssueBookSerializer

@api_view(['GET'])
def issued_books(request):
    """Get a list of all issued books."""
    issued_books = IssueBook.objects.select_related('reader', 'book').all()
    serializer = IssueBookSerializer(issued_books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def return_book(request, id):
    """Process returning a book and calculate the fine if returned late."""
    issue_record = get_object_or_404(IssueBook, id=id)

    if issue_record.returned:
        return Response({"error": "Book is already returned."}, status=status.HTTP_400_BAD_REQUEST)

    today = now().date()
    fine = 0

    if today > issue_record.due_date:
        diff_days = (today - issue_record.due_date).days
        fine = diff_days * 5  # Assuming $5 per day as fine

    issue_record.returned = True
    issue_record.save()

    return Response({"message": "Book returned successfully!", "fine": fine}, status=status.HTTP_200_OK)



