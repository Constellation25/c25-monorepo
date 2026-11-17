import os
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FacePrintPay API", version="1.0.0")

class HealthResponse(BaseModel):
    status: str
    service: str

@app.get("/health", response_model=HealthResponse)
def health():
    return {"status": "operational", "service": "FacePrintPay"}

@app.get("/")
def root():
    return {"message": "FacePrintPay API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
