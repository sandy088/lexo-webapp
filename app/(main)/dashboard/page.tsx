"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle, Printer, Share2 } from "lucide-react";
import { ResultsSummary } from "./_components/result-summary";
import { ResultsDetails } from "./_components/result-details";
import { DocumentPreview } from "./_components/document-preview";
import { mockDocuments } from "@/lib/mock-data";
import { UploadSection } from "./_components/upload-section";
import { useUploadStore } from "@/store/is-upload-store";

interface ContractAnalysis {
  data: {
    summary: string;
    flags: Array<{
      type: string;
      clauseText: string;
      explanation: string;
      severity: string;
    }>;
    suggestions: Array<{
      originalClause: string;
      suggestedRewrite: string;
      reason: string;
    }>;
  };
}
const Dashboard = () => {
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { isUploaded } = useUploadStore();

  useEffect(() => {
    // Retrieve analysis data from localStorage
    const storedAnalysis = localStorage.getItem("contractAnalysis");
    const storedFileName = localStorage.getItem("contractFileName");

    if (storedAnalysis) {
      try {
        setAnalysis(JSON.parse(storedAnalysis));
        if (storedFileName) {
          setFileName(storedFileName);
        }
      } catch (error) {
        console.error("Error parsing analysis data:", error);
      }
    }

    setLoading(false);
  }, [isUploaded]);
  return (
    <div className="w-full px-5 relative">
      <Header />
      {!isUploaded && (
        <div
          className=" w-full absolute bottom-0 left-0
          bg-gradient-to-t h-full z-10 from-primary-foreground to-primary-foreground/75
         "
        ></div>
      )}

      {!isUploaded && (
        <div className=" w-full absolute h-screen flex justify-center items-center top-0 left-0 z-10 overflow-hidden">
          <UploadSection />
        </div>
      )}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Analysis Results</h1>
              {fileName && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {fileName}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Upload New
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ResultsSummary
                summary={
                  analysis?.data?.summary || mockDocuments[0].analysis.summary
                }
                flags={analysis?.data?.flags || mockDocuments[0].analysis.flags}
              />
              <ResultsDetails
                flags={analysis?.data?.flags || mockDocuments[0].analysis.flags}
                suggestions={
                  analysis?.data?.suggestions ||
                  mockDocuments[0].analysis.suggestions
                }
              />
            </div>
            <div>
              <DocumentPreview
                fileName={fileName}
                flags={analysis?.data?.flags || mockDocuments[0].analysis.flags}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
