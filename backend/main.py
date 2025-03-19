from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "PUT"],  
    allow_headers=["*"],
) 
class QAItem(BaseModel):
    question: str
    answer: str

class BotData(BaseModel):
    bot_name: str
    qa: List[QAItem]

@app.post("/save_bot")
async def save_bot(
    bot_name: str = Form(...),
    qa: str = Form(...),  
    file: Optional[UploadFile] = File(None)
):
    try:
        parsed_qa = json.loads(qa)
        print(f"Bot Name: {bot_name}")
        print(f"Q&A Data: {parsed_qa}")
        if file:
            file_location = f"uploads/{file.filename}"
            with open(file_location, "wb") as f:
                f.write(file.file.read())
            print(f"File saved at {file_location}")
        session_id = "example_session_123"
        return {"message": "Bot data received successfully", "sessionid": session_id}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing data: {e}")