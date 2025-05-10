"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Flag {
  type: string
  clauseText: string
  explanation: string
  severity: string
}

interface DocumentPreviewProps {
  fileName: string
  flags: Flag[]
}

export function DocumentPreview({ fileName, flags }: DocumentPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50))
  }

  // This is a placeholder for the actual document preview
  // In a real implementation, you would render the PDF or image here
  return (
    <Card className="sticky top-20 z-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Document Preview</CardTitle>
            <CardDescription>{fileName || "Contract document"}</CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs w-12 text-center">{zoomLevel}%</span>
            <Button variant="ghost" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in document..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="document">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="highlights">Highlights ({flags.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="document" className="mt-4">
            <div
              className="border rounded-md bg-muted/30 flex flex-col items-center justify-center p-4 min-h-[500px]"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            >
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                Document preview not available in this demo.
                <br />
                In a real implementation, the PDF or image would be displayed here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="highlights" className="mt-4">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {flags.map((flag, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border ${
                    flag.severity === "High"
                      ? "bg-red-500/10 border-red-500/20"
                      : flag.severity === "Medium"
                        ? "bg-yellow-500/10 border-yellow-500/20"
                        : "bg-green-500/10 border-green-500/20"
                  }`}
                >
                  <p className="text-xs font-medium mb-1">{flag.type}</p>
                  <p className="text-sm">{flag.clauseText}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
