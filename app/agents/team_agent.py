from phi.agent import Agent
from phi.storage.agent.sqlite import SqlAgentStorage
from .web_agent import web_agent
from .finance_agent import finance_agent

agent_team = Agent(
    name="Agent Team",
    agent_id="agent_team",
    team=[web_agent, finance_agent],
    storage=SqlAgentStorage(
        table_name="agent_team_sessions",
        db_file="agents.db"
    ),
    markdown=True,
)