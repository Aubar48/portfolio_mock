from rest_framework import serializers
from core.models import Slide

class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = ['id', 'user', 'title', 'image', 'publicado', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
