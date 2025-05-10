"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Flag {
  type: string
  clauseText: string
  explanation: string
  severity: string
}

interface Suggestion {
  originalClause: string
  suggestedRewrite: string
  reason: string
}

interface ResultsDetailsProps {
  flags: Flag[]
  suggestions: Suggestion[]
}

export function ResultsDetails({ flags, suggestions }: ResultsDetailsProps) {
  const [activeTab, setActiveTab] = useState("issues")

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "Medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "Low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-500 bg-red-500/10"
      case "Medium":
        return "text-yellow-500 bg-yellow-500/10"
      case "Low":
        return "text-green-500 bg-green-500/10"
      default:
        return "text-yellow-500 bg-yellow-500/10"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
        <CardDescription>Issues found in your contract and suggested improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="issues">Issues ({flags.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {flags.map((flag, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      {getSeverityIcon(flag.severity)}
                      <div className="ml-2 text-left">
                        <div className="font-medium">{flag.type}</div>
                        <div className="text-xs text-muted-foreground">{flag.severity} Severity</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className={`p-3 rounded-md ${getSeverityColor(flag.severity)}`}>
                        <p className="text-sm font-medium">Original Clause:</p>
                        <p className="text-sm mt-1">{flag.clauseText}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Explanation:</p>
                        <p className="text-sm mt-1">{flag.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {suggestions.map((suggestion, index) => (
                <AccordionItem key={index} value={`suggestion-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div className="ml-2 text-left">
                        <div className="font-medium">Suggested Improvement {index + 1}</div>
                        <div className="text-xs text-muted-foreground">
                          {suggestion.originalClause.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-red-500/10">
                        <p className="text-sm font-medium">Original Clause:</p>
                        <p className="text-sm mt-1">{suggestion.originalClause}</p>
                      </div>

                      <div className="flex items-center justify-center my-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="p-3 rounded-md bg-green-500/10">
                        <p className="text-sm font-medium">Suggested Rewrite:</p>
                        <p className="text-sm mt-1">{suggestion.suggestedRewrite}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Reason for Change:</p>
                        <p className="text-sm mt-1">{suggestion.reason}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
