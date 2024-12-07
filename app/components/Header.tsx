import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SA CGT Optimizer
        </Link>
        <nav>
          <Button variant="secondary" asChild>
            <Link href="/about">About</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
