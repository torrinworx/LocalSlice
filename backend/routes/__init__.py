from . import test
from fastapi import APIRouter

router = APIRouter()

router.include_router(test.router)
