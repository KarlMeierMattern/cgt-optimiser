import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModalDialog, DialogHeader, DialogContent } from "./modal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground w-screen">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          South African CGT Optimisation Tool
        </Link>
        <nav>
          <Button onClick={() => setIsMenuOpen(true)} variant="secondary">
            About
          </Button>
        </nav>
        {isMenuOpen ? (
          <ModalDialog onClose={() => setIsMenuOpen(false)}>
            <DialogHeader />
            <DialogContent />
          </ModalDialog>
        ) : null}
      </div>
    </header>
  );
}
