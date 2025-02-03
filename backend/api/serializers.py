# serializers.py
from rest_framework import serializers
from .models import reader, Book,Genre

# class ReaderSerializer(serializers.ModelSerializer):
#     # books_in_bag = BookSerializer(many=True, read_only=True)
#     class Meta:
#         model = reader
#         fields = ['id', 'reference_id', 'reader_name', 'reader_contact','reader_address', 'books_in_bag']


from rest_framework import serializers
from .models import reader, Book

class ReaderSerializer(serializers.ModelSerializer):
    books_in_bag = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  

    class Meta:
        model = reader
        fields = ['id', 'reference_id', 'reader_name', 'reader_contact', 'reader_address', 'books_in_bag']





class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'published_date', 'genre', 'description']



from rest_framework import serializers
from .models import IssueBook

class IssueBookSerializer(serializers.ModelSerializer):
    reader_name = serializers.CharField(source="reader.reader_name", read_only=True)
    book_title = serializers.CharField(source="book.title", read_only=True)

    class Meta:
        model = IssueBook
        fields = ['id', 'reader_name', 'book_title', 'issue_date', 'due_date', 'returned']

