
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clipboard, FileSearch, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { Establishment } from "@/lib/data";

interface EstablishmentCardProps {
  establishment: Establishment;
}

export function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-success hover:bg-success/80";
      case "Warning":
        return "bg-warning hover:bg-warning/80";
      case "Non-Compliant":
        return "bg-destructive hover:bg-destructive/80";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{establishment.name}</CardTitle>
          <Badge className={getStatusColorClass(establishment.status)}>{establishment.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-start">
            <Utensils className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">{establishment.category}</div>
              <div className="text-sm text-muted-foreground">{establishment.address}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">License:</div>
              <div>{establishment.licenseNumber}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Owner:</div>
              <div>{establishment.owner}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Last Inspection:</div>
              <div>{establishment.lastInspection ? new Date(establishment.lastInspection).toLocaleDateString() : "Not inspected yet"}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/establishments/${establishment.id}`}>
            <FileSearch className="h-4 w-4 mr-1" />
            Details
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/inspections/new?establishmentId=${establishment.id}`}>
            <Clipboard className="h-4 w-4 mr-1" />
            Inspect
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
