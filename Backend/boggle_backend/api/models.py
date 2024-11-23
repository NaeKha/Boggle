from django.db import models

# Create your models here.

class Games(models.Model):
    name = models.CharField(max_length=25)
    size = models.IntegerField()
    grid = models.TextField() # Serialize the 2d array to a string:
    foundwords = models.TextField() #Serialize the array of words to a single string:

    def __str__(self):
        return f'Name: {self.name} Size: {self.size} Grid: {self.grid}'