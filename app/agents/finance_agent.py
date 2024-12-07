from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.tools.yfinance import YFinanceTools
from phi.storage.agent.sqlite import SqlAgentStorage

finance_agent = Agent(
    name="Finance Agent",
    agent_id="finance_agent",
    role="Get financial data",
    model=OpenAIChat(id="gpt-4o"),
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
        db_file="agents.db"
    ),
    markdown=True,
)