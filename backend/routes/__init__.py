import os
import importlib
from fastapi import APIRouter

router = APIRouter()

# Add all routes to APIRouter
current_folder = os.path.dirname(os.path.abspath(__file__))

for filename in os.listdir(current_folder):
    if filename.endswith('.py') and filename != '__init__.py':
        module_name = filename[:-3]  # Remove the '.py' from filename
        module = importlib.import_module(f'.{module_name}', package=__name__)

        if hasattr(module, 'router'):
            router.include_router(module.router)
