from pydantic import BaseModel, Field

class AgentRequest(BaseModel):
    query: str = Field(..., description="The query to process")

class AgentResponse(BaseModel):
    response: str = Field(..., description="The agent's response")