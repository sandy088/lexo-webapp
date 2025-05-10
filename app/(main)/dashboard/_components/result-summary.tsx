import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Flag {
  type: string;
  clauseText: string;
  explanation: string;
  severity: string;
}

interface ResultsSummaryProps {
  summary: string;
  flags: Flag[];
}

export function ResultsSummary({ summary, flags }: ResultsSummaryProps) {
  // Count flags by severity
  const highRiskCount = flags.filter((flag) => flag.severity === "High").length;
  const mediumRiskCount = flags.filter(
    (flag) => flag.severity === "Medium"
  ).length;
  const lowRiskCount = flags.filter((flag) => flag.severity === "Low").length;

  // Calculate overall risk score (0-100)
  const riskScore = Math.min(
    100,
    Math.round(highRiskCount * 25 + mediumRiskCount * 10 + lowRiskCount * 3)
  );

  // Determine risk level
  let riskLevel = "Low";
  let riskColor = "text-green-500";
  let riskBg = "bg-green-500/10";
  //   let riskIcon = CheckCircle

  if (riskScore > 60) {
    riskLevel = "High";
    riskColor = "text-red-500";
    riskBg = "bg-red-500/10";
    // riskIcon = AlertCircle
  } else if (riskScore > 30) {
    riskLevel = "Medium";
    riskColor = "text-yellow-500";
    riskBg = "bg-yellow-500/10";
    // riskIcon = AlertTriangle
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Summary</CardTitle>
        <CardDescription>
          AI-generated summary and risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <p className="text-sm">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className={`col-span-1 rounded-lg ${riskBg} p-4 flex flex-col items-center justify-center`}
          >
            <div className="text-3xl font-bold mb-1 flex items-center">
              <span className={riskColor}>{riskScore}</span>
              <span className="text-sm text-muted-foreground ml-1">/100</span>
            </div>
            <div className="flex items-center">
              {/* <riskIcon className={`h-4 w-4 mr-1 ${riskColor}`} /> */}
              <span className={`text-sm font-medium ${riskColor}`}>
                {riskLevel} Risk
              </span>
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-red-500/10 p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold mb-1 text-red-500">
                {highRiskCount}
              </div>
              <div className="text-xs text-center text-muted-foreground">
                High Risk Issues
              </div>
            </div>

            <div className="rounded-lg bg-yellow-500/10 p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold mb-1 text-yellow-500">
                {mediumRiskCount}
              </div>
              <div className="text-xs text-center text-muted-foreground">
                Medium Risk Issues
              </div>
            </div>

            <div className="rounded-lg bg-green-500/10 p-4 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold mb-1 text-green-500">
                {lowRiskCount}
              </div>
              <div className="text-xs text-center text-muted-foreground">
                Low Risk Issues
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
