import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight:['700'],
});

interface NavbarItemProps{
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
};

const NavbarItem = ({
    href, 
    children,
    isActive,
}: NavbarItemProps) => {
    return (
        <Button>
            {children}
        </Button>
    );
};

const navbarItems = [
    {href:"/", children: "Home"},
    {href:"/about", children: "About"},
    {href:"/pricing", children: "pricing"},
    {href:"/contact", children: "Contact"},


];

export const Navbar = () => {
    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    locality
                </span>
            </Link>
        </nav>
    );
};

