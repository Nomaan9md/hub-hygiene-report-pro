
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EstablishmentCard } from "@/components/establishments/EstablishmentCard";
import { establishments } from "@/lib/data";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

const Establishments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extract unique categories from establishments
  const categories = Array.from(new Set(establishments.map(est => est.category)));
  
  // Filter the establishments based on the current filters
  const filteredEstablishments = establishments.filter(est => {
    // Filter by search query
    const matchesSearch = est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = categoryFilter === "all" || est.category === categoryFilter;

    // Filter by status
    const matchesStatus = statusFilter === "all" || est.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Establishments</h1>
            <p className="text-muted-foreground">
              Manage and inspect food establishments
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Add Establishment
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search establishments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Compliant">Compliant</SelectItem>
              <SelectItem value="Warning">Warning</SelectItem>
              <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEstablishments.length > 0 ? (
            filteredEstablishments.map(establishment => (
              <EstablishmentCard key={establishment.id} establishment={establishment} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium">No establishments found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Establishments;
