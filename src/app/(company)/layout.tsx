import { CompanyTabs } from "@/components/company/CompanyTabs";
import { companyTabs } from "@/data/company";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CompanyTabs tabs={companyTabs} />
      {children}
    </>
  );
}
