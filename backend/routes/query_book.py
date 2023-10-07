import os
import json
import requests
from typing import List, Optional
from pydantic import BaseModel, Field

from dotenv import load_dotenv

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.param_functions import Query

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma

# Need to use locally hosted models:
from langchain.llms import HuggingFacePipeline
from langchain.embeddings import HuggingFaceEmbeddings

from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

load_dotenv()

router = APIRouter()

MODEL = os.getenv("MODEL")


class DocumentSection(BaseModel):
    name: str = Field(...)
    description: str = Field(...)


class DocumentResponse(BaseModel):
    message: str = Field(...)
    document_sections: List[DocumentSection] = Field(...)


def query_book_and_compile_answer(book_content: str) -> Optional[List[DocumentSection]]:
    # Split documents into chunks
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    book_chunks = text_splitter.split_text(book_content)
    
    # Embed the chunks
    embeddings = HuggingFaceEmbeddings(model_name="C:\\Users\\torri\\Desktop\\Repositories\\Personal\\LocalSlice\\models\\gte-large")
    db = Chroma.from_texts(book_content, embeddings)
    
    # Run similarity search
    book_content = str(db.similarity_search(""))  # Add prompt to vector database
    db.delete_collection()
    
    # model_id = os.path.abspath("models/Mistral-7B-v0.1")
    # tokenizer = AutoTokenizer.from_pretrained(model_id)
    # model = AutoModelForCausalLM.from_pretrained(model_id)
    # pipe = pipeline(
    #     task="text-generation", model=model, tokenizer=tokenizer, max_new_tokens=2000, 
    # )
    
    # # Initialize and run the language model
    # llm = HuggingFacePipeline(pipeline=pipe)
    
    # prompt_template = PromptTemplate(
    #     input_variables=['document_content'],
    #     template=""  # Add another prompt to model including the content from the query
    # )
    # prompt_template.format(document_content=book_content)
    # chain = LLMChain(llm=llm, prompt=prompt_template)
    # document_sections = chain.run(book_content)

    # # Try to decode model response to JSON
    # try:
    #     document_sections = json.loads(document_sections)
    # except Exception as e:
    #     print(f"An error occurred while decoding model response to JSON: {e}")
    #     return None

    # return document_sections


@router.post(
    "/query-book",
    response_model=DocumentResponse,
    summary="Query a book and compile an answer",
    description=(
        "This endpoint accepts a book URL, downloads the text file, queries a vector database, "
        "and compiles an answer using a large language model."
    )
)
async def query_book_endpoint(
    url: str = Query(..., description="The URL of the book to be processed")
) -> JSONResponse:
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Failed to retrieve book: {e}")

    book_content = response.text
    
    document_sections = query_book_and_compile_answer(book_content)
    
    if document_sections is None:
        return JSONResponse(
            content={
                "message": "Query failed",
                "document_sections": None
            },
            status_code=400
        )

    return JSONResponse(
        content={
            "message": "Query successful",
            "document_sections": document_sections,
        },
        status_code=200
    )
