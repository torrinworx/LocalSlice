
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post(
    "/test",
    summary="",
    description=""
)
async def store_files_endpoint(
) -> JSONResponse:

    return JSONResponse(
        content={
            "message": "Hello World!"
        },
        status_code=200
    )