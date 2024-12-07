from pydantic import BaseModel

class AgentRequest(BaseModel):
    query: str

class AgentResponse(BaseModel):
    response: str