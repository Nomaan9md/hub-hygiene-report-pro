
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { InspectionForm } from "@/components/inspection/InspectionForm";
import { establishments, inspections } from "@/lib/data";

const Inspection = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const establishmentId = searchParams.get("establishmentId");
  const navigate = useNavigate();

  // Handle new inspection case
  if (id === "new" && establishmentId) {
    const establishment = establishments.find(est => est.id === establishmentId);
    
    if (!establishment) {
      return (
        <Layout>
          <div className="space-y-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Error</h1>
            </div>
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Establishment not found</h2>
                <p className="text-muted-foreground mt-2">
                  The establishment you're trying to inspect could not be found.
                </p>
                <Button className="mt-4" onClick={() => navigate("/establishments")}>
                  View All Establishments
                </Button>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">New Inspection</h1>
              <p className="text-muted-foreground">Inspecting {establishment.name}</p>
            </div>
          </div>
          
          <InspectionForm 
            establishmentName={establishment.name} 
            establishmentId={establishment.id} 
          />
        </div>
      </Layout>
    );
  }

  // Handle viewing existing inspection case
  const inspection = inspections.find(insp => insp.id === id);
  
  if (!inspection) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Error</h1>
          </div>
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Inspection not found</h2>
              <p className="text-muted-foreground mt-2">
                The inspection you're looking for could not be found.
              </p>
              <Button className="mt-4" onClick={() => navigate("/inspections")}>
                View All Inspections
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inspection Details</h1>
            <p className="text-muted-foreground">
              {inspection.establishmentName} - {new Date(inspection.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div>
          <p>Inspection view page will be implemented in future updates.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Inspection;
