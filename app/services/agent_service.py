from typing import Optional
import os
from dotenv import load_dotenv
from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.tools.duckduckgo import DuckDuckGo
from phi.tools.yfinance import YFinanceTools
from phi.storage.agent.sqlite import SqlAgentStorage

load_dotenv()

class AgentService:
    def __init__(self):
        self.storage_dir = "tmp"
        os.makedirs(self.storage_dir, exist_ok=True)
        
        self.web_agent = None
        self.finance_agent = None
        self.team_agent = None
        
    def initialize_agent(self, api_key: str) -> None:
        """Initialize agents with the provided API key"""
        self.web_agent = Agent(
            name="Web Agent",
            agent_id="web_agent",
            role="Search the web for information",
            model=OpenAIChat(
                id="gpt-4",
                api_key=api_key
            ),
            tools=[DuckDuckGo()],
            instructions=["Always include sources"],
            storage=SqlAgentStorage(
                table_name="web_agent_sessions",
                db_file=f"{self.storage_dir}/agents.db"
            ),
            markdown=True,
        )
        
        self.finance_agent = Agent(
            name="Finance Agent",
            agent_id="finance_agent",
            role="Get financial data",
            model=OpenAIChat(
                id="gpt-4",
                api_key=api_key
            ),
            tools=[
                YFinanceTools(
                    stock_price=True,
                    analyst_recommendations=True,
                    company_info=True,
                    company_news=True
                )
            ],
            instructions=["Always use tables to display data"],
            storage=SqlAgentStorage(
                table_name="finance_agent_sessions",
                db_file=f"{self.storage_dir}/agents.db"
            ),
            markdown=True,
        )
        
        self.team_agent = Agent(
            name="Agent Team",
            agent_id="agent_team",
            team=[self.web_agent, self.finance_agent],
            storage=SqlAgentStorage(
                table_name="agent_team_sessions",
                db_file=f"{self.storage_dir}/agents.db"
            ),
            markdown=True,
        )
    
    async def get_agent_response(
        self, 
        agent_type: str, 
        query: str,
        api_key: str
    ) -> str:
        """Get response from specified agent"""
        try:
            # Initialize agents with the provided API key
            self.initialize_agent(api_key)
            
            agent = {
                "web": self.web_agent,
                "finance": self.finance_agent,
                "team": self.team_agent
            }.get(agent_type)
            
            if not agent:
                raise ValueError(f"Invalid agent type: {agent_type}")
                
            response = await agent.arun(query)
            return response
            
        except Exception as e:
            print(f"Error getting agent response: {e}")
            raise

# Create a singleton instance
agent_service = AgentService()