export const metadata = {
  title: "Food shop | Dashboard",
  description: "This is dashboard for food shop for all family",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main>
      DASHBOARD
      {children}
    </main>
  );
}
