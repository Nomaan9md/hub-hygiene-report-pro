
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { inspections } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentInspectionsProps {
  className?: string;
}

export function RecentInspections({ className }: RecentInspectionsProps) {
  // Sort inspections by date (newest first)
  const sortedInspections = [...inspections].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5); // Get only the 5 most recent

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>Recent Inspections</CardTitle>
        <CardDescription>Latest inspection results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedInspections.map((inspection) => (
            <div key={inspection.id} className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{inspection.establishmentName}</p>
                <p className="text-sm text-muted-foreground">
                  Inspected on {new Date(inspection.date).toLocaleDateString()}
                </p>
                <div className="flex items-center pt-1">
                  <StatusBadge status={inspection.status} />
                  <span className="ml-2 text-sm">
                    Score: {inspection.score}%
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/inspections/${inspection.id}`}>
                  <FileSearch className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "Compliant" | "Non-Compliant" | "Warning" }) {
  if (status === "Compliant") {
    return <Badge className="bg-success hover:bg-success/80">Compliant</Badge>;
  } else if (status === "Warning") {
    return <Badge className="bg-warning hover:bg-warning/80">Warning</Badge>;
  } else {
    return <Badge variant="destructive">Non-Compliant</Badge>;
  }
}
