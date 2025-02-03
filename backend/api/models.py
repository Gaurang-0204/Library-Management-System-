# from django.db import models

# from django.db import models

# class Genre(models.Model):
#     name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.name

# # Book model
# class Book(models.Model):
#     title = models.CharField(max_length=200)
#     author = models.CharField(max_length=200)
#     isbn = models.CharField(max_length=20, unique=True)
#     published_date = models.DateField()
#     genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
#     description = models.TextField()

#     def __str__(self):
#         return self.title


# # reader model (lowercase name)
# class reader(models.Model):
#     reference_id = models.CharField(max_length=200)
#     reader_name = models.CharField(max_length=200)
#     reader_contact = models.CharField(max_length=200)
#     reader_address = models.TextField()
#     active = models.BooleanField(default=True)
#     books_in_bag_old = models.ManyToManyField("Book", related_name="old_bag")


#     def __str__(self):
#         return self.reader_name
    


from django.db import models
from django.utils.timezone import now

class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=20, unique=True)
    published_date = models.DateField()
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)  # Prevent accidental book deletion
    description = models.TextField()

    def __str__(self):
        return self.title

class reader(models.Model):
    reference_id = models.CharField(max_length=200)
    reader_name = models.CharField(max_length=200)
    reader_contact = models.CharField(max_length=200)
    reader_address = models.TextField()
    active = models.BooleanField(default=True)
    books_in_bag = models.ManyToManyField("Book", related_name="reader_bag")  # Re-added

    def __str__(self):
        return self.reader_name
    

class IssueBook(models.Model):
    reader = models.ForeignKey(reader, on_delete=models.CASCADE, related_name="issued_books")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="issued_to")
    issue_date = models.DateField(default=now)
    due_date = models.DateField()
    returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.reader.reader_name} - {self.book.title}"



