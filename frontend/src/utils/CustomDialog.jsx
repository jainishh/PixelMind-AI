import React, { useState, createContext, useContext, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, AlertTriangle, MessageSquare } from "lucide-react";

// Context to hold dialog state
const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        type: "confirm", // 'confirm' or 'prompt'
        title: "",
        message: "",
        defaultValue: "",
        resolve: null,
    });

    const [promptValue, setPromptValue] = useState("");
    const inputRef = useRef(null);

    // Close dialog and resolve with false/null
    const handleClose = () => {
        if (dialogState.resolve) {
            dialogState.resolve(null);
        }
        setDialogState((prev) => ({ ...prev, isOpen: false }));
    };

    // Confirm action
    const handleConfirm = () => {
        if (dialogState.resolve) {
            if (dialogState.type === "prompt") {
                dialogState.resolve(promptValue);
            } else {
                dialogState.resolve(true);
            }
        }
        setDialogState((prev) => ({ ...prev, isOpen: false }));
    };

    // Expose methods to open dialog
    const openDialog = (options) => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                type: options.type || "confirm",
                title: options.title || "Confirm",
                message: options.message || "",
                defaultValue: options.defaultValue || "",
                resolve,
            });
            setPromptValue(options.defaultValue || "");
        });
    };

    // Focus input on open
    useEffect(() => {
        if (dialogState.isOpen && dialogState.type === "prompt" && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [dialogState.isOpen, dialogState.type]);


    // Assign to static property for utility access (hacky but works for non-hook usage if needed, but context is better)
    // We will expose context hook for usage in components
    dialog.open = openDialog;

    return (
        <DialogContext.Provider value={openDialog}>
            {children}
            <AnimatePresence>
                {dialogState.isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        >
                            {/* Modal */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-5 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${dialogState.type === 'confirm' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {dialogState.type === 'confirm' ? <AlertTriangle size={20} /> : <MessageSquare size={20} />}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{dialogState.title}</h3>
                                    </div>
                                    <button onClick={handleClose} className="text-gray-400 hover:text-white transition">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                        {dialogState.message}
                                    </p>

                                    {dialogState.type === "prompt" && (
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={promptValue}
                                            onChange={(e) => setPromptValue(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                                            placeholder="Enter value..."
                                        />
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 bg-gray-900/30 flex justify-end gap-3 border-t border-gray-700/50">
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className={`px-6 py-2 text-sm font-bold text-white rounded-lg shadow-lg transform transition-all active:scale-95 ${dialogState.type === 'confirm'
                                                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/20'
                                                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/20'
                                            }`}
                                    >
                                        {dialogState.type === 'prompt' ? 'Save' : 'Confirm'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </DialogContext.Provider>
    );
};

// Utility object to use outside of hooks (via internal ref hack if we wanted, but for now we export helper for context)
// Actually simpler: We export a hook to access the context.
export const useDialog = () => {
    const openDialog = useContext(DialogContext);

    // Helper wrappers
    const confirm = (message, title = "Are you sure?") => {
        return openDialog({ type: "confirm", title, message });
    };

    const prompt = (message, defaultValue = "", title = "Enter input") => {
        return openDialog({ type: "prompt", title, message, defaultValue });
    };

    return { confirm, prompt };
};


export const dialog = {}; 
