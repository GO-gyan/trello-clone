import OrgControl from "./_components/org-control";

function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
}

export default OrganizationIdLayout;
