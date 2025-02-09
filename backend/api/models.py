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


# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError("The Email field must be set")
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault("is_staff", True)
#         extra_fields.setdefault("is_superuser", True)
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)
#     username = models.CharField(max_length=150, unique=True)
    
#     # Add related_name attributes to avoid conflicts
#     groups = models.ManyToManyField(
#         "auth.Group", related_name="customuser_set", blank=True
#     )
#     user_permissions = models.ManyToManyField(
#         "auth.Permission", related_name="customuser_set", blank=True
#     )

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ["username"]

#     objects = CustomUserManager()

#     def __str__(self):
#         return self.email


from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)

    # Fix conflicts with Django's default user model
    groups = models.ManyToManyField(
        "auth.Group", related_name="customuser_groups", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="customuser_permissions", blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    


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
    issued = models.BooleanField(default=False)

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
    

# class IssueBook(models.Model):
#     reader = models.ForeignKey(reader, on_delete=models.CASCADE, related_name="issued_books")
#     book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="issued_to")
#     issue_date = models.DateField(default=now)
#     due_date = models.DateField()
#     returned = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{self.reader.reader_name} - {self.book.title}"



class IssueBook(models.Model):
    reader = models.ForeignKey(reader, on_delete=models.CASCADE, related_name="issued_books")
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    issue_date = models.DateField(default=now)
    due_date = models.DateField()
    returned = models.BooleanField(default=False)
    return_date = models.DateField(null=True, blank=True)
    fine_amount = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def calculate_fine(self):
        if self.returned and self.return_date and self.return_date > self.due_date:
            overdue_days = (self.return_date - self.due_date).days
            return overdue_days * 5  # Assume fine = $5 per day
        return 0

    def save(self, *args, **kwargs):
        self.fine_amount = self.calculate_fine()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reader.reader_name} - {self.book.title}"



