import { BuildingQuiz } from "@/components/building-quiz"

export default function QuizPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Building Plan Knowledge Quiz</h1>
          <p className="text-muted-foreground">
            Test your knowledge of building specifications, compliance, and construction details
          </p>
        </div>
        <BuildingQuiz />
      </div>
    </div>
  )
}
