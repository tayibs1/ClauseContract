from langchain.prompts import ChatPromptTemplate

analyse_initial_prompt = ChatPromptTemplate.from_template("""
You are a legal document summarization assistant. Given the initial text of a tenancy agreement, extract and structure the key contractual points that should be included in the final contract. Ensure the summary is concise, clear, and legally relevant. The summary should include the following sections:

1.Parties Involved – Identify the landlord and tenant.
2.Property Details – Specify the address and type of property.
3.Term of Tenancy – Define the start and end dates, including renewal conditions.
4.Rent and Payment Terms – Outline the rental amount, payment frequency, due date, and acceptable payment methods.
5.Security Deposit – Specify the deposit amount, conditions for deductions, and refund terms.
6.Tenant Obligations – Summarize key responsibilities such as maintenance, utility payments, and restrictions (e.g., subletting, pets, noise levels).
7.Landlord Obligations – Highlight responsibilities like property repairs, insurance, and access rules.
8.Termination and Notice Periods – Define the conditions for early termination, notice requirements, and penalties.
9.Legal Compliance and Dispute Resolution – Mention applicable laws and how disputes will be resolved (e.g., arbitration, court jurisdiction).
10.Additional Clauses  Capture any extra terms such as furnishing conditions, smoking policies, or specific property rules.


Return the extracted key points in a structured format suitable for drafting a formal contract.

The Legal document: {initialse}
""")


analyser_prompt = ChatPromptTemplate.from_template("""You are a legal analysis assistant. Your task is to review a provided piece of information (e.g., a contractual clause, a factual scenario, or a business practice) along with the relevant law that applies to it. Follow these steps:

1. **Extract Key Information:** Identify the most important facts, issues, and details from the provided text.
2. **Identify Relevant Law:** Pinpoint the legal provisions, statutes, or case law cited or applicable to the scenario.
3. **Evaluate Reasonableness:** Analyze the facts in light of the relevant law and determine whether the legal position or practice is "reasonable" or "unreasonable."
4. **Provide Explanation:** Return a clear verdict of either “Reasonable” or “Unreasonable” along with a detailed explanation of your reasoning, referencing the specific laws or legal principles that support your conclusion.

**Input Variables:**
- `info`: The text containing the important factual details.
- `law`: The text outlining the applicable law.

**Output Format:**
Return your findings as a structured summary:
- **Verdict:** [Reasonable/Unreasonable]
- **Explanation:** A detailed explanation of why you reached that verdict, citing relevant legal provisions or principles.

inforatiom needed: {initilise_analyse}
related law : {law}
Use this prompt to ensure your analysis is thorough, precise, and legally sound.
""")




first_analyse_prompt   =ChatPromptTemplate.from_template("""You are an expert legal document classifier. Analyze the provided document and classify it into one of these specific categories:
- Affiliate_Agreements
- Agency Agreements
- Co_Branding
- Collaboration
- Consulting_Agreements
- Development
- Distributor
- Endorsement Agreement
- Endorsement
- Franchise
- Hosting
- IP
- Joint Venture_Filing
- Joint Venture
- License_Agreements
- Maintenance
- Manufacturing
- Marketing
- Non_Compete_Non_Solicit
- Outsourcing
- Promotion
- Reseller
- Service
- Sponsorship
- Strategic Alliance
- Supply
- Transportation

Document for classification:
{summary}

""")



summary_prompt=ChatPromptTemplate.from_template("""
You are an AI legal analyst. Your task is to extract the **most important and relevant information** from a given legal document.  

### **Instructions:**  
- Identify and summarize the **key clauses, obligations, and rights** of all involved parties.  
- Extract **critical dates**, such as agreement start and end dates, renewal terms, deadlines, and penalties.  
- Highlight **financial terms**, including payment obligations, fees, commissions, penalties, or damages.  
- Identify **governing law and jurisdiction** to determine which laws apply.  
- Extract any **termination conditions**, including breach scenarios and dispute resolution methods.  
- Identify and summarize any **confidentiality, non-compete, or intellectual property** clauses.  
- If applicable, highlight **liability limitations, indemnification clauses, and warranties**.  
- If the document contains ambiguous, complex, or missing information, indicate this explicitly.  
- Provide the extracted information in **clear and structured JSON format** as follows:  
THE document: {initialse}
""")
