import { MessageCard } from "./index";

export default function CardsSection({
  items,
  filteredItems,
  renderItems,
  emptyMessage = "Ingen elementer funnet.",
  noResultsMessage = "Ingen treff. Prøv et annet søk.",
}) {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        {items.length === 0 ? (
          <MessageCard message={emptyMessage} />
        ) : filteredItems.length > 0 ? (
          renderItems(filteredItems)
        ) : (
          <MessageCard message={noResultsMessage} />
        )}
      </div>
    </section>
  );
}
