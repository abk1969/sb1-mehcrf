from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from app.schemas.agent import AgentRequest, AgentResponse
from app.services.agent_service import agent_service

router = APIRouter(prefix="/agents", tags=["agents"])

@router.post("/{agent_type}", response_model=AgentResponse)
async def run_agent(
    agent_type: str, 
    request: AgentRequest,
    authorization: Optional[str] = Header(None)
):
    """Run an agent with the specified query"""
    try:
        if not authorization or not authorization.startswith('Bearer '):
            raise HTTPException(
                status_code=401, 
                detail="Missing or invalid API key"
            )
            
        api_key = authorization.replace('Bearer ', '')
        
        response = await agent_service.get_agent_response(
            agent_type=agent_type,
            query=request.query,
            api_key=api_key
        )
        
        return AgentResponse(response=response)
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))