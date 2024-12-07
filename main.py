import uvicorn
from app import app
from app.services.agent_service import initialize_agents

if __name__ == "__main__":
    # Initialize agents before starting the server
    initialize_agents()
    
    # Start the FastAPI server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )