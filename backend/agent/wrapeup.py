# main.py
import asyncio
from decider import SummaryAgent, CategoryEnum, DocumentCategory
from agent_analyser import AnalyserAgent

async def main():
    # Test document
    test_document = """
    AFFILIATE AGREEMENT

    This Affiliate Agreement ("Agreement") is entered into as of [DATE] between [COMPANY NAME] ("Company") and [AFFILIATE NAME] ("Affiliate").

    1. APPOINTMENT
    Company hereby appoints Affiliate as a non-exclusive marketing affiliate to promote Company's products or services.

    2. COMMISSION
    Affiliate shall receive commission for qualified sales as defined in Schedule A.
    """

    # Initialize state for summary agent
    initial_state_summary = {
        "initialse": test_document,
        "summary": "",
        "category": DocumentCategory(category=CategoryEnum.AFFILIATE_AGREEMENTS)
    }

    # Initialize agents
    summary_agent = SummaryAgent()
    analyser = AnalyserAgent()

    try:
        # Generate summary and analyze document
        summary_r = await summary_agent.summary(initial_state_summary)
        category = await summary_agent.analyse(summary_r)
        print(f"Document Category: {category}")

        # Use category to choose appropriate vector DB (placeholder for actual functionality)
        # TODO: Call function to get the right chunks for vector DB

        # Initialize state for analyser agent
        initial_state = {
            "law": [],  # Placeholder for law-related information
            "initialse": summary_r,
            "initialse_analysis": "",
            "response": None
        }

        # Analyze document and generate response
        state_with_analysis = await analyser.analyse_initials(initial_state)
        final_state = await analyser.analyse(state_with_analysis)

        # Print final response
        print(f"Response: {final_state['response']}")

    except Exception as e:
        print(f"Classification Error: {e}")

# Run the main function
if __name__ == "__main__":
    asyncio.run(main())
