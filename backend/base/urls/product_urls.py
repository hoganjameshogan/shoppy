from django.urls import path, include
from base.views import product_views as views


urlpatterns = [
    path('',views.get_products,name="getProducts"),
    path('<str:pk>/', views.get_one_product, name="getOneProduct")
]