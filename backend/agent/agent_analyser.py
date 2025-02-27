import logging
from typing import Dict, Any, TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_groq import ChatGroq
from pydantic import BaseModel,Field
from typing import List
from prompt import analyse_initial_prompt,analyser_prompt
import asyncio

logger = logging.getLogger(__name__)



class lawresponse(BaseModel):
    Reasonable: bool = Field(description="Reasonable means true OR NOT Reasonable means false")
    Reason: str = Field(description = "The reason behined the previous")

class BaseState(TypedDict):
    law: List[str]
    initialse_analysis: str
    initialse: str
    response:lawresponse

class AnalyserAgent:
    def __init__(self):
        logger.info("Initializing Agent")
        self.llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.1)
        self.graph = self._build_graph()
        logger.info("Agent initialized successfully")

    
    def _build_graph(self) -> Any:
        logger.info("Building processing graph")
        graph = StateGraph(BaseState)

        # Add nodes
        graph.add_node("analyse_initialse", self.analyse_initials)
        graph.add_node("analyse", self.analyse)

        # Define flow
        graph.add_edge(START, "analyse_initialse")
        graph.add_edge("analyse_initialse", "analyse")
        graph.add_edge("analyse", END)
        return graph

    async def analyse_initials(self, state: BaseState) -> BaseState:
    
        chain = analyse_initial_prompt | self.llm

        result = await chain.ainvoke({"initialse": state["initialse"]})

        return {
            **state,
            "initialse_analysis": str(result.content),
        }
    
    async def analyse(self, state: BaseState) -> BaseState:

        logger.info("analyser initial")
        structured_llm = self.llm.with_structured_output(lawresponse)
        chain =  analyser_prompt | structured_llm
        result = await chain.ainvoke({"initilise_analyse":state["initialse_analysis"],"law":state["law"]})

        logger.info("analyser initial is done")
        return {
            **state,
            "response": result,
        }

    def clear_cache(self):
        self._cache.clear()
        self._build_graph.cache_clear()





async def test_law_analysis():
    # Initialize test data
    test_laws = [
        "All citizens have the right to freedom of speech",
        "Freedom of speech does not extend to hate speech",
        "Public gatherings require prior notification"
    ]
    
    test_case = "A citizen organized a peaceful protest without notification"
    
    # Create initial state
    initial_state = {
        "law": test_laws,
        "initialse": test_case,
        "initialse_analysis": "",
        "response": None
    }

    # Initialize agent
    agent = AnalyserAgent()
    
    # Process analysis
    try:
        # First analyze the initial case
        state_with_analysis = await agent.analyse_initials(initial_state)
        #print(f"\nInitial Analysis: {state_with_analysis['initialse_analysis']}")
        
        # Then perform law analysis
        final_state = await agent.analyse(state_with_analysis)
        print(f"\nFinal Response: {final_state['response']}")
        
    except Exception as e:
        print(f"Error during analysis: {e}")

# Run the test
if __name__ == "__main__":
    asyncio.run(test_law_analysis())
