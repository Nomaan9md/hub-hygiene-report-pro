
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InspectionChart } from "@/components/dashboard/InspectionChart";
import { RecentInspections } from "@/components/dashboard/RecentInspections";
import { Calendar, Clipboard, FileSearch, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { establishments, inspections } from "@/lib/data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Calculate statistics
  const totalEstablishments = establishments.length;
  const totalInspections = inspections.length;
  const pendingInspections = establishments.filter(e => !e.lastInspection).length;
  const nonCompliantCount = establishments.filter(e => e.status === "Non-Compliant").length;
  const complianceRate = Math.round(((totalEstablishments - nonCompliantCount) / totalEstablishments) * 100);

  // Get upcoming establishment for demo
  const upcomingInspection = establishments.find(e => e.id === "est-004");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Inspector Sharma</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Establishments" 
            value={totalEstablishments.toString()}
            icon={<Utensils className="h-4 w-4" />} 
          />
          <StatCard 
            title="Total Inspections" 
            value={totalInspections.toString()} 
            icon={<Clipboard className="h-4 w-4" />}
            trend={{ value: 12, positive: true }}
            description="vs. last month"
          />
          <StatCard 
            title="Pending Inspections" 
            value={pendingInspections.toString()} 
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard 
            title="Compliance Rate" 
            value={`${complianceRate}%`} 
            icon={<FileSearch className="h-4 w-4" />}
            trend={{ value: 5, positive: true }}
            description="vs. last month"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InspectionChart className="lg:col-span-2" />
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Inspection</CardTitle>
              <CardDescription>Next scheduled establishment</CardDescription>
            </CardHeader>
            {upcomingInspection ? (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{upcomingInspection.name}</h3>
                    <p className="text-sm text-muted-foreground">{upcomingInspection.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Category:</div>
                      <div>{upcomingInspection.category}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Owner:</div>
                      <div>{upcomingInspection.owner}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">License:</div>
                      <div>{upcomingInspection.licenseNumber}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Status:</div>
                      <div>{upcomingInspection.status}</div>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link to={`/inspections/new?establishmentId=${upcomingInspection.id}`}>
                      <Clipboard className="h-4 w-4 mr-1" />
                      Start Inspection
                    </Link>
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-6 text-muted-foreground">
                  No upcoming inspections scheduled
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <RecentInspections />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
