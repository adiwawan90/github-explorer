import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggleClicked: () => void;
}

const Accordion = ({ title, children, isOpen, onToggleClicked }: AccordionProps) => {
  return (
    <div className="rounded-sm overflow-hidden">
      <button
        onClick={onToggleClicked}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <span className="font-medium">{title ?? "-"}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {children}
    </div>
  );
};

export default Accordion;