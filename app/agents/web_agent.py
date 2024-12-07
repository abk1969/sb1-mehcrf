from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.tools.duckduckgo import DuckDuckGo
from phi.storage.agent.sqlite import SqlAgentStorage

web_agent = Agent(
    name="Web Agent",
    agent_id="web_agent",
    role="Search the web for information",
    model=OpenAIChat(id="gpt-4o"),
    tools=[DuckDuckGo()],
    instructions=["Always include sources"],
    storage=SqlAgentStorage(
        table_name="web_agent_sessions",
        db_file="agents.db"
    ),
    markdown=True,
)