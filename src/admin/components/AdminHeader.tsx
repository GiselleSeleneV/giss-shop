import { Search, Bell, MessageSquare, Settings, Menu } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gold/20 px-3 sm:px-6 py-2 h-16">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 max-w-md">
          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-navy hover:bg-[#f7f3eb] lg:hidden"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <div className="relative min-w-0 flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-3 py-2 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold/40 focus:border-gold outline-none transition-all bg-white text-sm"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button className="relative p-2 text-navy/70 hover:bg-[#f7f3eb] rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full"></span>
          </button>

          <button className="hidden sm:block p-2 text-navy/70 hover:bg-[#f7f3eb] rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="hidden sm:block p-2 text-navy/70 hover:bg-[#f7f3eb] rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-gold font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            G
          </div>
        </div>
      </div>
    </header>
  );
};
