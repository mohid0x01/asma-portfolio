import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppWidget = () => {
  const [open, setOpen] = useState(false);
  const phone = "923029312872";
  const message = encodeURIComponent("Hi Asma! I'm interested in your e-commerce marketing services. Can we discuss?");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card rounded-2xl p-5 mb-4 w-72 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-bold text-foreground text-sm">Chat with Asma</h4>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Hi! 👋 How can I help you with your e-commerce business today?</p>
            <a href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-500 text-white font-body font-semibold text-sm hover:bg-green-600 transition-colors">
              <MessageCircle size={18} /> Start Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
