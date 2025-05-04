
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { inspectionCategories } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, CircleXIcon, FileCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InspectionFormProps {
  establishmentName: string;
  establishmentId: string;
}

export function InspectionForm({ establishmentName, establishmentId }: InspectionFormProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState(inspectionCategories);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleCheckItem = (categoryId: string, itemId: string, checked: boolean) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                compliant: checked
              };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };
  
  const calculateScore = () => {
    let totalItems = 0;
    let compliantItems = 0;
    
    categories.forEach(category => {
      category.items.forEach(item => {
        totalItems++;
        if (item.compliant) {
          compliantItems++;
        }
      });
    });
    
    return Math.round((compliantItems / totalItems) * 100);
  };
  
  const score = calculateScore();
  let status: "Compliant" | "Warning" | "Non-Compliant";
  
  if (score >= 90) {
    status = "Compliant";
  } else if (score >= 70) {
    status = "Warning";
  } else {
    status = "Non-Compliant";
  }
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Inspection Submitted",
        description: `Inspection for ${establishmentName} has been saved with a score of ${score}%.`,
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Summary</CardTitle>
            <CardDescription>Current inspection results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div 
                className={`text-5xl font-bold ${
                  status === "Compliant" 
                    ? "text-success" 
                    : status === "Warning" 
                    ? "text-warning" 
                    : "text-destructive"
                }`}
              >
                {score}%
              </div>
              <div 
                className={`mt-2 text-sm font-medium ${
                  status === "Compliant" 
                    ? "text-success" 
                    : status === "Warning" 
                    ? "text-warning" 
                    : "text-destructive"
                }`}
              >
                {status}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              {categories.map(category => {
                const compliantItems = category.items.filter(item => item.compliant).length;
                const percentage = Math.round((compliantItems / category.items.length) * 100);
                
                return (
                  <div key={category.id} className="flex justify-between items-center">
                    <div className="text-sm font-medium">{category.name}</div>
                    <div className="flex items-center">
                      <div 
                        className={`text-sm font-medium ${
                          percentage >= 90 
                            ? "text-success" 
                            : percentage >= 70 
                            ? "text-warning" 
                            : "text-destructive"
                        }`}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Inspection"}
              {!loading && <FileCheck className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inspection Notes</CardTitle>
            <CardDescription>Add detailed observations</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Enter detailed notes and observations about this inspection..."
              className="min-h-[250px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
      
      {categories.map(category => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>Check all compliant items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {category.items.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-start space-x-3 p-3 rounded-md ${
                    item.compliant ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
                  }`}
                >
                  <Checkbox 
                    id={item.id} 
                    checked={item.compliant} 
                    onCheckedChange={(checked) => handleCheckItem(category.id, item.id, checked === true)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {item.name}
                    </label>
                    <div className="text-xs flex items-center">
                      {item.compliant ? (
                        <>
                          <CheckIcon className="h-3 w-3 text-success mr-1" />
                          <span className="text-success">Compliant</span>
                        </>
                      ) : (
                        <>
                          <CircleXIcon className="h-3 w-3 text-destructive mr-1" />
                          <span className="text-destructive">Non-compliant</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
