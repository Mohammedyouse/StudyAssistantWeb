import { Github, Linkedin, Coffee } from "lucide-react";
import { useState } from "react";

export default function SocialWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <Coffee className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-4 min-w-48">
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/Mohammedyouse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-al-hajj-a3b912288"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}