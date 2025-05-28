import type { Customer } from "./Customer";
import type { Deal } from "./Deal";
import type { Interaction } from "./Interaction";
import type { Lead } from "./Lead";

export interface DashboardData {
    deals: Deal[];
    leads: Lead[];
    interactions: Interaction[];
    customers: Customer[];
}