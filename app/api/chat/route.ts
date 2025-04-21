import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"
import { buildingPlanQA } from "@/lib/data/building-plan-qa"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Improved document retrieval function with better matching
async function retrieveDocuments(query: string) {
  // Normalize the query for better matching
  const normalizedQuery = query.toLowerCase().trim()

  // Keywords to help with matching
  const keywords = normalizedQuery.split(/\s+/).filter((word) => word.length > 3)

  // Score each document based on keyword matches
  const scoredDocs = buildingPlanQA.map((qa) => {
    const questionMatches = keywords.filter((keyword) => qa.question.toLowerCase().includes(keyword)).length

    const answerMatches = keywords.filter((keyword) => qa.answer.toLowerCase().includes(keyword)).length

    // Calculate score - question matches are weighted higher
    const score = questionMatches * 2 + answerMatches

    return {
      content: qa.answer,
      source: qa.source,
      page: qa.page,
      question: qa.question,
      score,
    }
  })

  // Sort by score and take top results
  const relevantDocs = scoredDocs
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  // If no matches found, return a few default documents
  if (relevantDocs.length === 0) {
    return buildingPlanQA.slice(0, 2).map((qa) => ({
      content: qa.answer,
      source: qa.source,
      page: qa.page,
      question: qa.question,
      score: 0,
    }))
  }

  return relevantDocs
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `You are an AI assistant for MES (Manufacturing Execution System) specializing in building plans and construction documentation. 
    You provide accurate information about building specifications, materials, compliance, and technical details.
    
    IMPORTANT INSTRUCTIONS:
    1. When answering questions, ALWAYS use the information retrieved from the building plan documents.
    2. If the retrieved documents contain the answer, provide it clearly and concisely.
    3. Always cite your sources with document name and page number.
    4. If you don't know the answer or can't find it in the retrieved documents, say so clearly.
    5. Be technical and precise in your responses, as if you're referencing official documentation.
    6. Format your responses in a structured way for readability.
    7. If the user asks a question that seems unrelated to building plans, try to interpret it in the context of construction and building specifications.`,
    tools: {
      retrieveDocuments: tool({
        description: "Retrieve relevant documents based on the user's query about building plans",
        parameters: z.object({
          query: z.string().describe("The user's query to search for relevant building plan documents"),
        }),
        execute: async ({ query }) => retrieveDocuments(query),
      }),
    },
    maxSteps: 3, // Allow multiple steps for tool usage and response generation
  })

  return result.toDataStreamResponse()
}
