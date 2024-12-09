from django.urls import path, include
from .views import get_game, get_games, create_game

urlpatterns = [
    path('game/<int:pk>', get_game, name='get_game'),
    path('games/', get_games, name='get_games'),
    path('game/create/<int:size>', create_game, name='create_game'),
    # handles user management 
    path('auth/', include('djoser.urls')),  # /auth/users/ for registration
    path('auth/', include('djoser.urls.authtoken')),  # /auth/token/login(logout)/ for login
]
