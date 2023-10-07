from . import query_book, test
from fastapi import APIRouter

router = APIRouter()

# Add endpoints as needed:
router.include_router(test.router)
router.include_router(query_book.router)

"""
Any solution to resolve this repeating code issue must account for the fact
that endpoints need to be hot-reloaded in development. This is currently the
only solution that I've found that works like this. Any other dymanic solution
does not hot-reload modules.
"""
