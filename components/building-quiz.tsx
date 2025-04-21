"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from "lucide-react"

// Import the quiz data
import quizData from "@/lib/data/building-quiz.json"

export function BuildingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleCheckAnswer = () => {
    if (!selectedOption) return

    const question = quizData.quiz.questions[currentQuestion]
    const selectedAnswer = question.options.find((option) => option.id === selectedOption)

    if (selectedAnswer?.isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowExplanation(false)

    if (currentQuestion < quizData.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const question = quizData.quiz.questions[currentQuestion]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{quizData.quiz.title}</CardTitle>
        <CardDescription>{quizData.quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizData.quiz.questions.length}
              </span>
              <span className="text-sm font-medium">
                Score: {score}/{quizData.quiz.questions.length}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{question.question}</h3>

              <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-2 rounded-md border p-3 ${
                        showExplanation && option.isCorrect
                          ? "border-green-500 bg-green-50"
                          : showExplanation && selectedOption === option.id && !option.isCorrect
                            ? "border-red-500 bg-red-50"
                            : ""
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} disabled={showExplanation} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                      {showExplanation && option.isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {showExplanation && selectedOption === option.id && !option.isCorrect && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {showExplanation && (
              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Explanation</h4>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <h3 className="text-2xl font-bold">Quiz Completed!</h3>
            <p className="text-lg">
              Your score: {score} out of {quizData.quiz.questions.length}
            </p>
            <p className="text-muted-foreground">
              {score === quizData.quiz.questions.length
                ? "Perfect score! You're an expert on building plans."
                : score >= quizData.quiz.questions.length / 2
                  ? "Good job! You have a solid understanding of building plans."
                  : "Keep learning! Building plans can be complex."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!quizCompleted ? (
          <>
            {!showExplanation ? (
              <Button onClick={handleCheckAnswer} disabled={!selectedOption}>
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < quizData.quiz.questions.length - 1 ? (
                  <>
                    Next Question <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Complete Quiz"
                )}
              </Button>
            )}
          </>
        ) : (
          <Button onClick={handleRestartQuiz} className="mx-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
