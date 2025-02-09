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

# class ReaderSerializer(serializers.ModelSerializer):
#     books_in_bag = serializers.PrimaryKeyRelatedField(many=True, read_only=True) 

#     books_in_bag = serializers.SerializerMethodField()

#     def get_books_in_bag(self, obj):
#         # Count the number of books issued to this reader and not returned
#         return IssueBook.objects.filter(reader=obj, returned=False).count() 

#     class Meta:
#         model = reader
#         fields = ['id', 'reference_id', 'reader_name', 'reader_contact', 'reader_address', 'books_in_bag']


from rest_framework import serializers
from .models import reader, IssueBook

# class ReaderSerializer(serializers.ModelSerializer):
#     books_in_bag = serializers.SerializerMethodField()  # Only keep this one

#     def get_books_in_bag(self, obj):
#         # Count the number of books issued to this reader and not returned
#         return IssueBook.objects.filter(reader=obj, returned=False).count() 

#     class Meta:
#         model = reader  # Capitalize 'Reader' correctly
#         fields = ['id', 'reference_id', 'reader_name', 'reader_contact', 'reader_address', 'books_in_bag']



class ReaderSerializer(serializers.ModelSerializer):
    books_in_bag = serializers.SerializerMethodField()
    issued_books = serializers.SerializerMethodField()
    returned_books = serializers.SerializerMethodField()
    total_fine = serializers.SerializerMethodField()

    def get_books_in_bag(self, obj):
        # Count the number of books issued to this reader and not returned
        return IssueBook.objects.filter(reader=obj, returned=False).count()

    def get_issued_books(self, obj):
        issued = obj.issued_books.filter(returned=False)
        return IssueBookSerializer(issued, many=True).data

    def get_returned_books(self, obj):
        returned = obj.issued_books.filter(returned=True)
        return IssueBookSerializer(returned, many=True).data

    def get_total_fine(self, obj):
        return sum(obj.issued_books.filter(returned=True).values_list('fine_amount', flat=True))

    class Meta:
        model = reader
        fields = ['id', 'reference_id', 'reader_name', 'reader_contact', 'reader_address', 'books_in_bag', 'issued_books', 'returned_books', 'total_fine']




class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    is_issued = serializers.BooleanField(read_only=True) 
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'published_date', 'genre', 'description',"is_issued"]



from rest_framework import serializers
from .models import IssueBook

# class IssueBookSerializer(serializers.ModelSerializer):
#     reader_name = serializers.CharField(source="reader.reader_name", read_only=True)
#     book_title = serializers.CharField(source="book.title", read_only=True)

#     class Meta:
#         model = IssueBook
#         fields = ['id', 'reader_name', 'book_title', 'issue_date', 'due_date', 'returned']


class IssueBookSerializer(serializers.ModelSerializer):
    reader_name = serializers.CharField(source="reader.reader_name", read_only=True)
    book_title = serializers.CharField(source="book.title", read_only=True)
    fine_amount = serializers.DecimalField(max_digits=6, decimal_places=2, read_only=True)

    class Meta:
        model = IssueBook
        fields = ['id', 'reader_name', 'book_title', 'issue_date', 'due_date', 'returned', 'fine_amount']
