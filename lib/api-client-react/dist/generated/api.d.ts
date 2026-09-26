import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Activity, Claim, ClaimInput, Customer, CustomerInput, DashboardSummary, HealthStatus, NotFoundResponse, Policy, Proposal, ProposalInput, Quote, QuoteInput } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetDashboardSummaryUrl: () => string;
/**
 * @summary Get dashboard summary
 */
export declare const getDashboardSummary: (options?: Parameters<typeof customFetch>[1]) => Promise<DashboardSummary>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/api/dashboard/summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard summary
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetActivityUrl: () => string;
/**
 * @summary Get recent activity
 */
export declare const getActivity: (options?: Parameters<typeof customFetch>[1]) => Promise<Activity[]>;
export declare const getGetActivityQueryKey: () => readonly ["/api/activity"];
export declare const getGetActivityQueryOptions: <TData = Awaited<ReturnType<typeof getActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getActivity>>>;
export type GetActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get recent activity
 */
export declare function useGetActivity<TData = Awaited<ReturnType<typeof getActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListCustomersUrl: () => string;
/**
 * @summary List customers
 */
export declare const listCustomers: (options?: Parameters<typeof customFetch>[1]) => Promise<Customer[]>;
export declare const getListCustomersQueryKey: () => readonly ["/api/customers"];
export declare const getListCustomersQueryOptions: <TData = Awaited<ReturnType<typeof listCustomers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCustomers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCustomers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCustomersQueryResult = NonNullable<Awaited<ReturnType<typeof listCustomers>>>;
export type ListCustomersQueryError = ErrorType<unknown>;
/**
 * @summary List customers
 */
export declare function useListCustomers<TData = Awaited<ReturnType<typeof listCustomers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCustomers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCustomerUrl: () => string;
/**
 * @summary Create a customer
 */
export declare const createCustomer: (customerInput: CustomerInput, options?: Parameters<typeof customFetch>[1]) => Promise<Customer>;
export declare const getCreateCustomerMutationKey: () => readonly ["createCustomer"];
export declare const getCreateCustomerMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCustomer>>, TError, CreateCustomerMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCustomer>>, TError, CreateCustomerMutationVariables, TContext>;
export type CreateCustomerMutationResult = NonNullable<Awaited<ReturnType<typeof createCustomer>>>;
export type CreateCustomerMutationBody = BodyType<CustomerInput>;
export type CreateCustomerMutationError = ErrorType<unknown>;
export type CreateCustomerMutationVariables = {
    data: BodyType<CustomerInput>;
};
/**
* @summary Create a customer
*/
export declare const useCreateCustomer: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCustomer>>, TError, CreateCustomerMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCustomer>>, TError, CreateCustomerMutationVariables, TContext>;
export declare const getListQuotesUrl: () => string;
/**
 * @summary List quotes
 */
export declare const listQuotes: (options?: Parameters<typeof customFetch>[1]) => Promise<Quote[]>;
export declare const getListQuotesQueryKey: () => readonly ["/api/quotes"];
export declare const getListQuotesQueryOptions: <TData = Awaited<ReturnType<typeof listQuotes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListQuotesQueryResult = NonNullable<Awaited<ReturnType<typeof listQuotes>>>;
export type ListQuotesQueryError = ErrorType<unknown>;
/**
 * @summary List quotes
 */
export declare function useListQuotes<TData = Awaited<ReturnType<typeof listQuotes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listQuotes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateQuoteUrl: () => string;
/**
 * @summary Create an insurance quote
 */
export declare const createQuote: (quoteInput: QuoteInput, options?: Parameters<typeof customFetch>[1]) => Promise<Quote>;
export declare const getCreateQuoteMutationKey: () => readonly ["createQuote"];
export declare const getCreateQuoteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError, CreateQuoteMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError, CreateQuoteMutationVariables, TContext>;
export type CreateQuoteMutationResult = NonNullable<Awaited<ReturnType<typeof createQuote>>>;
export type CreateQuoteMutationBody = BodyType<QuoteInput>;
export type CreateQuoteMutationError = ErrorType<unknown>;
export type CreateQuoteMutationVariables = {
    data: BodyType<QuoteInput>;
};
/**
* @summary Create an insurance quote
*/
export declare const useCreateQuote: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createQuote>>, TError, CreateQuoteMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createQuote>>, TError, CreateQuoteMutationVariables, TContext>;
export declare const getGetQuoteUrl: (id: string) => string;
/**
 * @summary Get a quote
 */
export declare const getQuote: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<Quote>;
export declare const getGetQuoteQueryKey: (id: string) => readonly [`/api/quotes/${string}`];
export declare const getGetQuoteQueryOptions: <TData = Awaited<ReturnType<typeof getQuote>>, TError = ErrorType<NotFoundResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetQuoteQueryResult = NonNullable<Awaited<ReturnType<typeof getQuote>>>;
export type GetQuoteQueryError = ErrorType<NotFoundResponse>;
/**
 * @summary Get a quote
 */
export declare function useGetQuote<TData = Awaited<ReturnType<typeof getQuote>>, TError = ErrorType<NotFoundResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getQuote>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateProposalUrl: () => string;
/**
 * @summary Submit a proposal from a quote
 */
export declare const createProposal: (proposalInput: ProposalInput, options?: Parameters<typeof customFetch>[1]) => Promise<Proposal>;
export declare const getCreateProposalMutationKey: () => readonly ["createProposal"];
export declare const getCreateProposalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProposal>>, TError, CreateProposalMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createProposal>>, TError, CreateProposalMutationVariables, TContext>;
export type CreateProposalMutationResult = NonNullable<Awaited<ReturnType<typeof createProposal>>>;
export type CreateProposalMutationBody = BodyType<ProposalInput>;
export type CreateProposalMutationError = ErrorType<unknown>;
export type CreateProposalMutationVariables = {
    data: BodyType<ProposalInput>;
};
/**
* @summary Submit a proposal from a quote
*/
export declare const useCreateProposal: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createProposal>>, TError, CreateProposalMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createProposal>>, TError, CreateProposalMutationVariables, TContext>;
export declare const getListPoliciesUrl: () => string;
/**
 * @summary List policies
 */
export declare const listPolicies: (options?: Parameters<typeof customFetch>[1]) => Promise<Policy[]>;
export declare const getListPoliciesQueryKey: () => readonly ["/api/policies"];
export declare const getListPoliciesQueryOptions: <TData = Awaited<ReturnType<typeof listPolicies>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPolicies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPolicies>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPoliciesQueryResult = NonNullable<Awaited<ReturnType<typeof listPolicies>>>;
export type ListPoliciesQueryError = ErrorType<unknown>;
/**
 * @summary List policies
 */
export declare function useListPolicies<TData = Awaited<ReturnType<typeof listPolicies>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPolicies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListClaimsUrl: () => string;
/**
 * @summary List claims
 */
export declare const listClaims: (options?: Parameters<typeof customFetch>[1]) => Promise<Claim[]>;
export declare const getListClaimsQueryKey: () => readonly ["/api/claims"];
export declare const getListClaimsQueryOptions: <TData = Awaited<ReturnType<typeof listClaims>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listClaims>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listClaims>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListClaimsQueryResult = NonNullable<Awaited<ReturnType<typeof listClaims>>>;
export type ListClaimsQueryError = ErrorType<unknown>;
/**
 * @summary List claims
 */
export declare function useListClaims<TData = Awaited<ReturnType<typeof listClaims>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listClaims>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateClaimUrl: () => string;
/**
 * @summary Register a claim
 */
export declare const createClaim: (claimInput: ClaimInput, options?: Parameters<typeof customFetch>[1]) => Promise<Claim>;
export declare const getCreateClaimMutationKey: () => readonly ["createClaim"];
export declare const getCreateClaimMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClaim>>, TError, CreateClaimMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createClaim>>, TError, CreateClaimMutationVariables, TContext>;
export type CreateClaimMutationResult = NonNullable<Awaited<ReturnType<typeof createClaim>>>;
export type CreateClaimMutationBody = BodyType<ClaimInput>;
export type CreateClaimMutationError = ErrorType<unknown>;
export type CreateClaimMutationVariables = {
    data: BodyType<ClaimInput>;
};
/**
* @summary Register a claim
*/
export declare const useCreateClaim: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createClaim>>, TError, CreateClaimMutationVariables, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createClaim>>, TError, CreateClaimMutationVariables, TContext>;
export declare const getGetClaimUrl: (id: string) => string;
/**
 * @summary Get a claim
 */
export declare const getClaim: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<Claim>;
export declare const getGetClaimQueryKey: (id: string) => readonly [`/api/claims/${string}`];
export declare const getGetClaimQueryOptions: <TData = Awaited<ReturnType<typeof getClaim>>, TError = ErrorType<NotFoundResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getClaim>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getClaim>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetClaimQueryResult = NonNullable<Awaited<ReturnType<typeof getClaim>>>;
export type GetClaimQueryError = ErrorType<NotFoundResponse>;
/**
 * @summary Get a claim
 */
export declare function useGetClaim<TData = Awaited<ReturnType<typeof getClaim>>, TError = ErrorType<NotFoundResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getClaim>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map