
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, FileSearch, Download, Calendar, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inspections } from "@/lib/data";

const Reports = () => {
  const recentInspections = [...inspections].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">View and generate inspection reports</p>
        </div>
        
        <Tabs defaultValue="inspections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inspections">
              <FileSearch className="h-4 w-4 mr-2" />
              Inspection Reports
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              <Calendar className="h-4 w-4 mr-2" />
              Scheduled
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inspections" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Inspection Reports</CardTitle>
                    <CardDescription>
                      View and download inspection reports
                    </CardDescription>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Establishment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentInspections.map((inspection) => (
                      <TableRow key={inspection.id}>
                        <TableCell className="font-medium">{inspection.establishmentName}</TableCell>
                        <TableCell>{new Date(inspection.date).toLocaleDateString()}</TableCell>
                        <TableCell>{inspection.inspector}</TableCell>
                        <TableCell>{inspection.score}%</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            inspection.status === "Compliant" 
                              ? "bg-success text-success-foreground" 
                              : inspection.status === "Warning"
                              ? "bg-warning text-warning-foreground"
                              : "bg-destructive text-destructive-foreground"
                          }`}>
                            {inspection.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileSearch className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Advanced analytics will be available in future updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Advanced analytics and reporting features will be available in a future update.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Scheduled reporting will be available in future updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Coming Soon</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Scheduled reporting features allowing you to automatically generate and send reports on a defined schedule will be available in a future update.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
