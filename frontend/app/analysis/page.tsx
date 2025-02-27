"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Scale, Sparkles, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

// Define the types for our analysis results
type AnalysisResult = {
  summary: string
  keyPoints: string[]
  riskAssessment: {
    level: "low" | "medium" | "high"
    details: string
  }
  recommendations: string[]
}

export default function AnalysisPage() {
  // State to track the current step in the process
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // State to track loading status during file processing
  const [isLoading, setIsLoading] = useState(false)

  // State to store analysis results from the backend
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)

  // State to track any errors that occur
  const [error, setError] = useState<string | null>(null)

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    // Reset any previous errors
    setError(null)

    // Validate file type (PDF or Word document)
    if (file) {
      const fileType = file.type
      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setSelectedFile(file)
      } else {
        setError("Please upload a PDF or Word document.")
        setSelectedFile(null)
      }
    }
  }

  // Handle file upload and processing
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.")
      return
    }

    // Reset states
    setError(null)
    setIsLoading(true)

    try {
      // Create form data to send the file
      const formData = new FormData()
      formData.append("document", selectedFile)

      // BACKEND CONNECTION POINT 1:
      // Send the file to the backend API for processing
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Parse the response data
      const data = await response.json()

      // Update state with the analysis results
      setAnalysisResults(data)

      // Move to the next step
      setCurrentStep(2)

      // After a brief delay, move to the final step to show insights
      setTimeout(() => {
        setCurrentStep(3)
      }, 2000)
    } catch (err) {
      console.error("Error uploading document:", err)
      setError("Failed to upload and analyze the document. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Document Analysis</h1>
          <p className="text-gray-500 md:text-lg mb-12">Upload your legal document to begin the AI-powered analysis</p>

          {/* Step indicators */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-3xl mb-12">
            <div
              className={`flex items-center p-4 rounded-lg ${currentStep >= 1 ? "bg-white shadow-sm" : "bg-gray-100"}`}
            >
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Step 1</div>
                <div className="text-gray-500 text-sm">Upload Document</div>
              </div>
            </div>

            <div
              className={`flex items-center p-4 rounded-lg ${currentStep >= 2 ? "bg-white shadow-sm" : "bg-gray-100"}`}
            >
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Scale className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Step 2</div>
                <div className="text-gray-500 text-sm">AI Analysis</div>
              </div>
            </div>

            <div
              className={`flex items-center p-4 rounded-lg ${currentStep >= 3 ? "bg-white shadow-sm" : "bg-gray-100"}`}
            >
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">Step 3</div>
                <div className="text-gray-500 text-sm">Get Insights</div>
              </div>
            </div>
          </div>

          {/* Step 1: Document Upload */}
          {currentStep === 1 && (
            <div className="w-full max-w-3xl">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center bg-white">
                <div className="bg-gray-100 p-4 rounded-full mb-6">
                  <Upload className="h-8 w-8 text-gray-500" />
                </div>

                <h2 className="text-xl font-semibold mb-2">Upload your document</h2>
                <p className="text-gray-500 mb-6 text-center">
                  Drop your PDF or Word document here, or click to browse
                </p>

                <p className="text-gray-400 text-sm mb-6">Maximum file size: 10MB</p>

                <input
                  type="file"
                  id="document-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <Button asChild variant="outline" className="mb-4">
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Select File
                  </label>
                </Button>

                {selectedFile && (
                  <div className="mt-4 text-sm">
                    <p className="font-medium">Selected file:</p>
                    <p>{selectedFile.name}</p>

                    <Button onClick={handleUpload} className="mt-4" disabled={isLoading}>
                      {isLoading ? "Uploading..." : "Analyze Document"}
                    </Button>
                  </div>
                )}

                {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
              </div>
            </div>
          )}

          {/* Step 2: Processing Animation */}
          {currentStep === 2 && (
            <div className="w-full max-w-3xl bg-white p-12 rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <div className="animate-pulse mb-6">
                  <Scale className="h-16 w-16 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Analyzing your document</h2>
                <p className="text-gray-500">Our AI is processing your document. This may take a moment...</p>

                <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full animate-[progress_2s_ease-in-out_infinite]"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {currentStep === 3 && analysisResults && (
            <div className="w-full max-w-3xl">
              <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-6">Document Analysis Results</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-gray-700">{analysisResults.summary}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {analysisResults.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        analysisResults.riskAssessment.level === "low"
                          ? "bg-green-500"
                          : analysisResults.riskAssessment.level === "medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium capitalize">{analysisResults.riskAssessment.level} Risk</span>
                  </div>
                  <p className="text-gray-700">{analysisResults.riskAssessment.details}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-700">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={() => setCurrentStep(1)}>Analyze Another Document</Button>
                <Button variant="outline" asChild>
                  <a href="#" download="analysis-report.pdf">
                    Download Report
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

