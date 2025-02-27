from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain_cohere import CohereEmbeddings

def process_document(file_path: str, destination:str, chunk_size: int = 1000):
    # Initialize embeddings
    embeddings_model = CohereEmbeddings(
        cohere_api_key="6KhoL1KnG1cnHlo4qb9jPaaXMUGNjE5O8F8Vd9JU",
        model="embed-english-v3.0"
    )

    # Load document
    raw_documents = TextLoader(file_path).load()
    document_content = raw_documents[0].page_content
    print(f"Document loaded: {len(document_content)} characters")

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=100,
        separators=["\n\n", "\n", " ", ""]
    )
    documents = splitter.split_documents(raw_documents)

    # Display chunks info
    for i, doc in enumerate(documents):
        print(f"Chunk {i+1}: {len(doc.page_content)} chars | Preview: {doc.page_content[:50]}...")
    print(f"Total chunks: {len(documents)}")

    # Create and save vector database
    db = Chroma.from_documents(
        documents=documents,
        embedding=embeddings_model,
        persist_directory=destination,
    )
    db.persist()
    
    return db


if __name__ == "__main__":
    l =  [
    "Affiliate_Agreements.txt",
    "Agency Agreements.txt",
    "Co_Branding.txt",
    "Collaboration.txt",
    "Consulting_Agreements.txt",
    "Development.txt",
    "Distributor.txt",
    "Endorsement Agreement.txt",
    "Endorsement.txt",
    "Franchise.txt",
    "Hosting.txt",
    "IP.txt",
    "Joint Venture_Filing.txt",
    "Joint Venture.txt",
    "License_Agreements.txt",
    "Maintenance.txt",
    "Manufacturing.txt",
    "Marketing.txt",
    "Non_Compete_Non_Solicit.txt",
    "Outsourcing.txt",
    "Promotion.txt",
    "Reseller.txt",
    "Service.txt",
    "Sponsorship.txt",
    "Strategic Alliance.txt",
    "Supply.txt",
    "Transportation.txt"
]
    import os
    for i in l:
        
        file_path = f"/Users/attaimen/gitrepos/ClauseContract/backend/agent/output/{i}"
        destination = f"./chroma_db/{i}"
        db = process_document(file_path,destination)