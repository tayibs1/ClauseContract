import logging
from typing import Dict, Any, TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_groq import ChatGroq
from pydantic import BaseModel,Field
from enum import Enum
from prompt import first_analyse_prompt,summary_prompt
import asyncio

logger = logging.getLogger(__name__)



class CategoryEnum(str, Enum):
    AFFILIATE_AGREEMENTS = "Affiliate_Agreements.txt"
    AGENCY_AGREEMENTS = "Agency Agreements.txt"
    CO_BRANDING = "Co_Branding.txt"
    COLLABORATION = "Collaboration.txt"
    CONSULTING_AGREEMENTS = "Consulting_Agreements.txt"
    DEVELOPMENT = "Development.txt"
    DISTRIBUTOR = "Distributor.txt"
    ENDORSEMENT_AGREEMENT = "Endorsement Agreement.txt"
    ENDORSEMENT = "Endorsement.txt"
    FRANCHISE = "Franchise.txt"
    HOSTING = "Hosting.txt"
    IP = "IP.txt"
    JOINT_VENTURE_FILING = "Joint Venture_Filing.txt"
    JOINT_VENTURE = "Joint Venture.txt"
    LICENSE_AGREEMENTS = "License_Agreements.txt"
    MAINTENANCE = "Maintenance.txt"
    MANUFACTURING = "Manufacturing.txt"
    MARKETING = "Marketing.txt"
    NON_COMPETE_NON_SOLICIT = "Non_Compete_Non_Solicit.txt"
    OUTSOURCING = "Outsourcing.txt"
    PROMOTION = "Promotion.txt"
    RESELLER = "Reseller.txt"
    SERVICE = "Service.txt"
    SPONSORSHIP = "Sponsorship.txt"
    STRATEGIC_ALLIANCE = "Strategic Alliance.txt"
    SUPPLY = "Supply.txt"
    TRANSPORTATION = "Transportation.txt"

class DocumentCategory(BaseModel):
    category: CategoryEnum

class BaseState(TypedDict):
    category: DocumentCategory
    initialse: str
    summary: str

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
        graph.add_node("generate_summary", self.summary)  # Renamed node
        graph.add_node("analyse_initialse", self.analyse)

        # Define flow
        graph.add_edge(START, "generate_summary")  # Updated node name
        graph.add_edge("generate_summary", "analyse_initialse")  # Updated
        graph.add_edge("analyse_initialse", END)

        return graph
    
    async def summary(self, state:BaseModel)->BaseModel:
        chain = summary_prompt | self.llm
        result = await chain.ainvoke({"initialse": state["initialse"]})

        return {
            **state,
            "summary": result,  
        }
    
    async def analyse(self, state: BaseState) -> BaseState:
        structured_llm = self.llm.with_structured_output(DocumentCategory)
        chain = first_analyse_prompt | structured_llm

        # Ensure the result matches expected format
        result = await chain.ainvoke({"summary": state["summary"]})

        # Extract the category safely
        if isinstance(result, dict) and "category" in result:
            category_value = result["category"]
        else:
            category_value = result.category  # Assuming it comes as an object

        # Ensure the category has ".txt"
        if not category_value.endswith(".txt"):
            category_value += ".txt"

        # Convert string to Enum (this will validate and raise an error if invalid)
        try:
            validated_category = CategoryEnum(category_value)
        except ValueError as e:
            raise ValueError(f"Invalid category detected: {category_value}. Error: {e}")

        return {
            **state,
            "category": validated_category,  # Store as Enum, not string
        }
    

    
async def test_document_classification():
    # Test document
    test_document = """
    AFFILIATE AGREEMENT
    
    This Affiliate Agreement ("Agreement") is entered into as of [DATE] between [COMPANY NAME] ("Company") and [AFFILIATE NAME] ("Affiliate").
    
    1. APPOINTMENT
    Company hereby appoints Affiliate as a non-exclusive marketing affiliate to promote Company's products or services.
    
    2. COMMISSION
    Affiliate shall receive commission for qualified sales as defined in Schedule A.
    """
    
    # Initialize state
# Update initial state
    initial_state = {
        "initialse": test_document,
        "summary": "",
        "category": DocumentCategory(category=CategoryEnum.AFFILIATE_AGREEMENTS)
    }
    # Create and run agent
    agent = AnalyserAgent()
    try:

        summary_r = await agent.summary(initial_state)
        result = await agent.analyse(summary_r)

        print(f"\nDocument Classification Results:")
        print(f"Category: {result['category']}")
        
    except Exception as e:
        print(f"Classification Error: {e}")

# Run the test
if __name__ == "__main__":
    asyncio.run(test_document_classification())

