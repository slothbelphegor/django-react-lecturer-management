
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("lecturers", LecturerViewSet, basename="lecturers")
router.register("subjects", SubjectViewSet, basename="subjects")

urlpatterns = router.urls
