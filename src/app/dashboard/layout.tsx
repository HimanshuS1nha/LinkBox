import MaxWidthWrapper from "@/components/max-width-wrapper";
import DashboardNavbar from "./_components/dashboard-navbar";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MaxWidthWrapper>
        <DashboardNavbar />
        {children}
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
