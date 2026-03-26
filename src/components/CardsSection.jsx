export default function CardsSection({ items, filteredItems, renderItems, emptyMessage = "Ingen elementer funnet.", noResultsMessage = "Ingen treff. Prøv et annet søk." }) {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        {items.length === 0 ? (
          <div className="bg-white rounded-md border p-8 text-neutral-700">{emptyMessage}</div>
        ) : filteredItems.length > 0 ? (
          renderItems(filteredItems)
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-sm border-l-4 border-orange">
            <p className="text-neutral-800 md:text-lg">{noResultsMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}
