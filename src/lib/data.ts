
export interface Establishment {
  id: string;
  name: string;
  address: string;
  category: string;
  licenseNumber: string;
  owner: string;
  contactNumber: string;
  lastInspection: string | null;
  status: "Compliant" | "Non-Compliant" | "Pending" | "Warning";
}

export interface Inspection {
  id: string;
  establishmentId: string;
  establishmentName: string;
  date: string;
  inspector: string;
  score: number;
  status: "Compliant" | "Non-Compliant" | "Warning";
  observations: string[];
  nonComplianceDetails?: string;
  correctiveActions?: string[];
  pictures?: string[];
}

// Mock establishments data
export const establishments: Establishment[] = [
  {
    id: "est-001",
    name: "Royal Spice Restaurant",
    address: "123 Main St, Delhi",
    category: "Restaurant",
    licenseNumber: "FSSAI-12345-67890",
    owner: "Raj Kumar",
    contactNumber: "9876543210",
    lastInspection: "2023-04-15",
    status: "Compliant"
  },
  {
    id: "est-002",
    name: "Green Leaf Cafe",
    address: "456 Park Avenue, Mumbai",
    category: "Cafe",
    licenseNumber: "FSSAI-23456-78901",
    owner: "Priya Singh",
    contactNumber: "8765432109",
    lastInspection: "2023-03-22",
    status: "Warning"
  },
  {
    id: "est-003",
    name: "City Sweets & Bakery",
    address: "789 Gandhi Road, Kolkata",
    category: "Bakery",
    licenseNumber: "FSSAI-34567-89012",
    owner: "Ahmed Khan",
    contactNumber: "7654321098",
    lastInspection: "2023-02-10",
    status: "Non-Compliant"
  },
  {
    id: "est-004",
    name: "Fresh Harvest Grocery",
    address: "101 Nehru Street, Bangalore",
    category: "Grocery Store",
    licenseNumber: "FSSAI-45678-90123",
    owner: "Lakshmi Devi",
    contactNumber: "6543210987",
    lastInspection: null,
    status: "Pending"
  },
  {
    id: "est-005",
    name: "Spice King Restaurant",
    address: "234 River Road, Chennai",
    category: "Restaurant",
    licenseNumber: "FSSAI-56789-01234",
    owner: "Vijay Sharma",
    contactNumber: "5432109876",
    lastInspection: "2023-04-28",
    status: "Compliant"
  }
];

// Mock inspections data
export const inspections: Inspection[] = [
  {
    id: "insp-001",
    establishmentId: "est-001",
    establishmentName: "Royal Spice Restaurant",
    date: "2023-04-15",
    inspector: "Inspector Sharma",
    score: 92,
    status: "Compliant",
    observations: [
      "Clean food preparation areas",
      "Proper storage of raw materials",
      "Staff wearing appropriate protective gear",
      "Valid medical certificates for all food handlers"
    ]
  },
  {
    id: "insp-002",
    establishmentId: "est-002",
    establishmentName: "Green Leaf Cafe",
    date: "2023-03-22",
    inspector: "Inspector Patel",
    score: 78,
    status: "Warning",
    observations: [
      "Generally clean premises",
      "Proper waste disposal",
      "Some issues with food storage temperatures",
      "Minor pest control concerns"
    ],
    nonComplianceDetails: "Food storage temperatures not maintained as per standards.",
    correctiveActions: [
      "Adjust refrigerator settings to maintain proper temperature",
      "Implement temperature monitoring system",
      "Train staff on temperature control importance"
    ]
  },
  {
    id: "insp-003",
    establishmentId: "est-003",
    establishmentName: "City Sweets & Bakery",
    date: "2023-02-10",
    inspector: "Inspector Singh",
    score: 62,
    status: "Non-Compliant",
    observations: [
      "Unsatisfactory cleaning practices",
      "Evidence of pest infestation",
      "Improper food storage",
      "Staff not wearing proper protective gear"
    ],
    nonComplianceDetails: "Multiple hygiene violations and pest control issues.",
    correctiveActions: [
      "Deep cleaning of entire facility",
      "Implement professional pest control measures",
      "Staff training on hygiene practices",
      "Reorganize storage areas as per guidelines"
    ]
  },
  {
    id: "insp-004",
    establishmentId: "est-005",
    establishmentName: "Spice King Restaurant",
    date: "2023-04-28",
    inspector: "Inspector Khan",
    score: 95,
    status: "Compliant",
    observations: [
      "Excellent cleanliness standards",
      "Proper food handling procedures",
      "Well-maintained equipment",
      "Good personal hygiene practices",
      "Proper waste management"
    ]
  }
];

// Monthly inspection data for chart
export const monthlyInspectionData = [
  { month: "Jan", compliant: 24, nonCompliant: 6, warning: 10 },
  { month: "Feb", compliant: 28, nonCompliant: 4, warning: 8 },
  { month: "Mar", compliant: 32, nonCompliant: 7, warning: 11 },
  { month: "Apr", compliant: 35, nonCompliant: 5, warning: 9 },
  { month: "May", compliant: 30, nonCompliant: 6, warning: 7 },
  { month: "Jun", compliant: 34, nonCompliant: 8, warning: 10 },
];

export const inspectionCategories = [
  {
    id: "hygiene",
    name: "Personal Hygiene",
    items: [
      { id: "hygiene-1", name: "Staff wearing clean uniforms", compliant: true },
      { id: "hygiene-2", name: "Staff wearing hair coverings", compliant: true },
      { id: "hygiene-3", name: "Staff wearing gloves during food preparation", compliant: false },
      { id: "hygiene-4", name: "Staff with valid medical certificates", compliant: true },
      { id: "hygiene-5", name: "Hand washing facilities available and accessible", compliant: true },
    ]
  },
  {
    id: "premises",
    name: "Premises Cleanliness",
    items: [
      { id: "premises-1", name: "Clean floors", compliant: true },
      { id: "premises-2", name: "Clean walls and ceilings", compliant: true },
      { id: "premises-3", name: "Adequate lighting", compliant: true },
      { id: "premises-4", name: "Proper ventilation", compliant: true },
      { id: "premises-5", name: "No evidence of pests", compliant: false },
    ]
  },
  {
    id: "foodStorage",
    name: "Food Storage",
    items: [
      { id: "storage-1", name: "Proper temperature for refrigerated items", compliant: true },
      { id: "storage-2", name: "Proper temperature for frozen items", compliant: true },
      { id: "storage-3", name: "Raw and cooked food stored separately", compliant: true },
      { id: "storage-4", name: "Food containers properly labeled with date", compliant: false },
      { id: "storage-5", name: "Food stored above ground level", compliant: true },
    ]
  },
  {
    id: "equipment",
    name: "Equipment & Utensils",
    items: [
      { id: "equipment-1", name: "Clean food preparation surfaces", compliant: true },
      { id: "equipment-2", name: "Clean utensils", compliant: true },
      { id: "equipment-3", name: "Equipment in good repair", compliant: true },
      { id: "equipment-4", name: "Proper dishwashing facilities", compliant: true },
      { id: "equipment-5", name: "Separate cutting boards for different food types", compliant: false },
    ]
  },
  {
    id: "waste",
    name: "Waste Management",
    items: [
      { id: "waste-1", name: "Covered waste bins", compliant: true },
      { id: "waste-2", name: "Regular waste disposal", compliant: true },
      { id: "waste-3", name: "Proper segregation of waste", compliant: false },
      { id: "waste-4", name: "Clean area around waste disposal", compliant: true },
      { id: "waste-5", name: "Proper drainage systems", compliant: true },
    ]
  }
];
