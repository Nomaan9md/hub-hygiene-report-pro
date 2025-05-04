
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlyInspectionData } from "@/lib/data";

interface InspectionChartProps {
  className?: string;
}

export function InspectionChart({ className }: InspectionChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Inspection Results</CardTitle>
        <CardDescription>Monthly breakdown of inspection outcomes</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyInspectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="compliant" name="Compliant" fill="hsl(var(--success))" stackId="a" />
            <Bar dataKey="warning" name="Warning" fill="hsl(var(--warning))" stackId="a" />
            <Bar dataKey="nonCompliant" name="Non-Compliant" fill="hsl(var(--destructive))" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
