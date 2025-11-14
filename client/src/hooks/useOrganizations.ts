import { useState } from "react";

export type Organization = {
  id: string;
  name: string;
  domain?: string;
  timezone?: string;
};

type UseOrganizationsResult = {
  organizations: Organization[];
  createOrganization: (data: Partial<Organization>) => void;
  updateOrganization: (id: string, data: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
};

export function useOrganizations(): UseOrganizationsResult {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "demo-org",
      name: "Zapper Demo Org",
      domain: "example.com",
      timezone: "America/Sao_Paulo",
    },
  ]);

  const createOrganization = (data: Partial<Organization>) => {
    const id = data.id ?? `org-${Date.now()}`;
    const org: Organization = {
      id,
      name: data.name ?? "Nova organização",
      domain: data.domain,
      timezone: data.timezone ?? "America/Sao_Paulo",
    };
    setOrganizations((prev) => [...prev, org]);
  };

  const updateOrganization = (id: string, data: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === id ? { ...org, ...data } : org
      )
    );
  };

  const deleteOrganization = (id: string) => {
    setOrganizations((prev) => prev.filter((org) => org.id !== id));
  };

  return {
    organizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
}
