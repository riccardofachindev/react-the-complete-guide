import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from './AccordionItem'

export default function AccordionContent({ className, children }) {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

    const isItemOpen = openItemId === id;

    return (
        <div className={isItemOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>{children}</div>
    )
}