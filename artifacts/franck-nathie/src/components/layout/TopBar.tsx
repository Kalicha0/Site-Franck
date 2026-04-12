import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#E86B0A] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-sm font-medium">
        <div className="flex items-center gap-2" data-testid="topbar-phone">
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          <span>02 43 58 66 41 / 07 88 83 58 53</span>
        </div>
        <div className="flex items-center gap-2" data-testid="topbar-email">
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          <a
            href="mailto:Contact@Franck-Nathie.com"
            className="hover:underline transition-all"
          >
            Contact@Franck-Nathie.com
          </a>
        </div>
      </div>
    </div>
  );
}
