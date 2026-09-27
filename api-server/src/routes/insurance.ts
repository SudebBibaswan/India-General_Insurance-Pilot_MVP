import { Router, type IRouter } from "express";
import {
  CreateClaimBody,
  CreateCustomerBody,
  CreateProposalBody,
  CreateQuoteBody,
  GetClaimParams,
  GetQuoteParams,
} from "@workspace/api-zod";

type Customer = {
  id: string;
  name: string;
  businessName: string;
  type: string;
  location: string;
  policies: number;
  status: string;
};

type Quote = {
  id: string;
  customerName: string;
  businessName: string;
  product: string;
  insurer: string;
  premium: number;
  coverage: number;
  status: string;
  expiresAt: string;
  createdAt: string;
};

type Policy = {
  id: string;
  policyNumber: string;
  customerName: string;
  businessName: string;
  product: string;
  insurer: string;
  premium: number;
  coverage: number;
  status: string;
  expiryDate: string;
  riskType: string;
};

type Claim = {
  id: string;
  claimNumber: string;
  policyNumber: string;
  customerName: string;
  incident: string;
  reportedAt: string;
  amount: number;
  status: string;
  priority: string;
  assignee: string;
};

type Activity = {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  status: string;
};

const now = new Date();
const dateIn = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const customers: Customer[] = [
  {
    id: "cus_001",
    name: "Aarav Mehta",
    businessName: "Mehta Electricals",
    type: "Business",
    location: "Andheri East, Mumbai",
    policies: 2,
    status: "Active",
  },
  {
    id: "cus_002",
    name: "Priya Nair",
    businessName: "Nair Logistics",
    type: "Business",
    location: "Whitefield, Bengaluru",
    policies: 1,
    status: "Active",
  },
  {
    id: "cus_003",
    name: "Rohan Shah",
    businessName: "Shah Home Studio",
    type: "Business",
    location: "Bodakdev, Ahmedabad",
    policies: 1,
    status: "Renewal due",
  },
];

const quotes: Quote[] = [
  {
    id: "quo_1001",
    customerName: "Rohan Shah",
    businessName: "Shah Home Studio",
    product: "SME Shield",
    insurer: "BharatSure General",
    premium: 18400,
    coverage: 2500000,
    status: "Awaiting documents",
    expiresAt: dateIn(5),
    createdAt: dateIn(-2),
  },
  {
    id: "quo_1002",
    customerName: "Aarav Mehta",
    businessName: "Mehta Electricals",
    product: "Shop & Stock Cover",
    insurer: "BharatSure General",
    premium: 12750,
    coverage: 1800000,
    status: "Ready to issue",
    expiresAt: dateIn(9),
    createdAt: dateIn(-1),
  },
  {
    id: "quo_1003",
    customerName: "Priya Nair",
    businessName: "Nair Logistics",
    product: "Fleet Protect",
    insurer: "Aegis India",
    premium: 48600,
    coverage: 5200000,
    status: "Under review",
    expiresAt: dateIn(12),
    createdAt: dateIn(-4),
  },
];

const policies: Policy[] = [
  {
    id: "pol_0001",
    policyNumber: "BGS/SME/24/08142",
    customerName: "Aarav Mehta",
    businessName: "Mehta Electricals",
    product: "Shop & Stock Cover",
    insurer: "BharatSure General",
    premium: 12750,
    coverage: 1800000,
    status: "Active",
    expiryDate: dateIn(42),
    riskType: "Retail",
  },
  {
    id: "pol_0002",
    policyNumber: "AGS/FLEET/24/01387",
    customerName: "Priya Nair",
    businessName: "Nair Logistics",
    product: "Fleet Protect",
    insurer: "Aegis India",
    premium: 48600,
    coverage: 5200000,
    status: "Active",
    expiryDate: dateIn(76),
    riskType: "Transport",
  },
  {
    id: "pol_0003",
    policyNumber: "BGS/SME/24/07731",
    customerName: "Rohan Shah",
    businessName: "Shah Home Studio",
    product: "SME Shield",
    insurer: "BharatSure General",
    premium: 18400,
    coverage: 2500000,
    status: "Renewal due",
    expiryDate: dateIn(18),
    riskType: "Studio",
  },
  {
    id: "pol_0004",
    policyNumber: "BGS/SME/24/06954",
    customerName: "Neha Kapoor",
    businessName: "Kapoor Foods",
    product: "Food Business Cover",
    insurer: "BharatSure General",
    premium: 22900,
    coverage: 3100000,
    status: "Active",
    expiryDate: dateIn(124),
    riskType: "Food & Beverage",
  },
];

const claims: Claim[] = [
  {
    id: "clm_0001",
    claimNumber: "CLM-2026-0418",
    policyNumber: "BGS/SME/24/08142",
    customerName: "Aarav Mehta",
    incident: "Water damage to inventory",
    reportedAt: dateIn(-2),
    amount: 185000,
    status: "Documents pending",
    priority: "High",
    assignee: "Sanjay Rao",
  },
  {
    id: "clm_0002",
    claimNumber: "CLM-2026-0409",
    policyNumber: "AGS/FLEET/24/01387",
    customerName: "Priya Nair",
    incident: "Rear collision — vehicle KA 01 MN 5521",
    reportedAt: dateIn(-6),
    amount: 92000,
    status: "Survey assigned",
    priority: "Medium",
    assignee: "Maya Fernandes",
  },
  {
    id: "clm_0003",
    claimNumber: "CLM-2026-0398",
    policyNumber: "BGS/SME/24/07731",
    customerName: "Rohan Shah",
    incident: "Electrical short circuit",
    reportedAt: dateIn(-12),
    amount: 68000,
    status: "Settlement pending",
    priority: "Low",
    assignee: "Sanjay Rao",
  },
];

const activity: Activity[] = [
  {
    id: "act_001",
    type: "claim",
    title: "Claim CLM-2026-0418 needs documents",
    description: "Mehta Electricals · Water damage to inventory",
    time: "18 min ago",
    status: "action",
  },
  {
    id: "act_002",
    type: "policy",
    title: "Policy issued successfully",
    description: "BGS/SME/24/08142 · Mehta Electricals",
    time: "2 hr ago",
    status: "success",
  },
  {
    id: "act_003",
    type: "renewal",
    title: "Renewal due in 18 days",
    description: "Shah Home Studio · SME Shield",
    time: "Yesterday",
    status: "warning",
  },
  {
    id: "act_004",
    type: "quote",
    title: "Quote is ready to issue",
    description: "Mehta Electricals · Shop & Stock Cover",
    time: "Yesterday",
    status: "success",
  },
];

const router: IRouter = Router();

router.get("/dashboard/summary", (_req, res) => {
  res.json({
    activePolicies: policies.filter((policy) => policy.status === "Active").length,
    openClaims: claims.filter((claim) => !["Settled", "Closed"].includes(claim.status)).length,
    renewalValue: policies
      .filter((policy) => policy.status === "Renewal due")
      .reduce((total, policy) => total + policy.premium, 0),
    pendingActions: quotes.filter((quote) =>
      ["Awaiting documents", "Ready to issue"].includes(quote.status),
    ).length + claims.filter((claim) => claim.status === "Documents pending").length,
    quoteConversion: 68,
  });
});

router.get("/activity", (_req, res) => {
  res.json(activity);
});

router.get("/customers", (_req, res) => {
  res.json(customers);
});

router.post("/customers", (req, res) => {
  const input = CreateCustomerBody.parse(req.body);
  const customer: Customer = {
    id: `cus_${String(customers.length + 1).padStart(3, "0")}`,
    ...input,
    policies: 0,
    status: "New",
  };
  customers.unshift(customer);
  activity.unshift({
    id: `act_${Date.now()}`,
    type: "customer",
    title: "New customer added",
    description: `${customer.businessName} · ${customer.location}`,
    time: "Just now",
    status: "success",
  });
  res.status(201).json(customer);
});

router.get("/quotes", (_req, res) => {
  res.json(quotes);
});

router.post("/quotes", (req, res) => {
  const input = CreateQuoteBody.parse(req.body);
  const quote: Quote = {
    id: `quo_${Date.now()}`,
    customerName: input.customerName,
    businessName: input.businessName,
    product: input.product,
    insurer: input.product === "Fleet Protect" ? "Aegis India" : "BharatSure General",
    premium: Math.round(input.coverage * (input.product === "Fleet Protect" ? 0.00935 : 0.0072)),
    coverage: input.coverage,
    status: "Awaiting documents",
    expiresAt: dateIn(7),
    createdAt: dateIn(0),
  };
  quotes.unshift(quote);
  res.status(201).json(quote);
});

router.get("/quotes/:id", (req, res) => {
  const { id } = GetQuoteParams.parse(req.params);
  const quote = quotes.find((item) => item.id === id);
  if (!quote) {
    res.status(404).json({ error: "Quote not found" });
    return;
  }
  res.json(quote);
});

router.post("/proposals", (req, res) => {
  const input = CreateProposalBody.parse(req.body);
  const quote = quotes.find((item) => item.id === input.quoteId);
  if (!quote) {
    res.status(404).json({ error: "Quote not found" });
    return;
  }
  quote.status = "Under review";
  res.status(201).json({
    id: `prp_${Date.now()}`,
    quoteId: quote.id,
    customerName: input.customerName,
    status: "Submitted",
    createdAt: dateIn(0),
  });
});

router.get("/policies", (_req, res) => {
  res.json(policies);
});

router.get("/claims", (_req, res) => {
  res.json(claims);
});

router.post("/claims", (req, res) => {
  const input = CreateClaimBody.parse(req.body);
  const claim: Claim = {
    id: `clm_${Date.now()}`,
    claimNumber: `CLM-2026-${String(420 + claims.length).padStart(4, "0")}`,
    policyNumber: input.policyNumber,
    customerName: input.customerName,
    incident: input.incident,
    reportedAt: dateIn(0),
    amount: input.amount,
    status: "Reported",
    priority: input.amount >= 150000 ? "High" : "Medium",
    assignee: "Unassigned",
  };
  claims.unshift(claim);
  activity.unshift({
    id: `act_${Date.now()}`,
    type: "claim",
    title: `New claim ${claim.claimNumber}`,
    description: `${claim.customerName} · ${claim.incident}`,
    time: "Just now",
    status: "action",
  });
  res.status(201).json(claim);
});

router.get("/claims/:id", (req, res) => {
  const { id } = GetClaimParams.parse(req.params);
  const claim = claims.find((item) => item.id === id);
  if (!claim) {
    res.status(404).json({ error: "Claim not found" });
    return;
  }
  res.json(claim);
});

export default router;