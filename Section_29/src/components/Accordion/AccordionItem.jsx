import { createContext, useContext } from "react"

const AccordionItemContext = createContext();

export const useAccordionItemContext = () => {
    const ctx = useContext(AccordionItemContext);

    if (!ctx) {
        throw new Error('Accordion-item related components must be wrapped in <Accordion.Item>')
    }

    return ctx;
}

export default function AccordionItem({ id, children, className }) {
    return (
        <AccordionItemContext.Provider value={id}>
            <li className={className}>
                {children}
            </li>
        </AccordionItemContext.Provider>
    )
}