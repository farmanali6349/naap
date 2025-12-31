import { ThemeToggle } from "./ThemeToggle";
import Logout from "./Logout";
import { RulerDimensionLine } from "lucide-react";
export default function Header() {
  return (
    <header className="border-b border-b-border h-20 px-4 mb-6 flex items-center">
      <div className="max-w-lg flex items-center justify-between w-full mx-auto">
        <div className="flex items-center gap-2">
          <RulerDimensionLine />
          <h2 className="font-medium text-lg">Naap</h2>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Logout />
        </div>
      </div>
    </header>
  );
}
