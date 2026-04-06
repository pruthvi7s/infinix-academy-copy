import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-3 flex flex-col justify-center items-center text-muted-foreground text-xs">
        <div className="text-center">
            <p>© 2025 Infinix Academy. All rights reserved.</p>
            <p>Created by Pruthvi and Team Infinix.</p>
        </div>
      </div>
    </footer>
  );
}
