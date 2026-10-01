export default function WpContentSection({
  content,
  onContentClick,
  children,
  bottomPaddingClassName = "pb-6",
}) {
  return (
    <section id="content" className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100">
      <div className={`max-w-4xl mx-auto px-6 pt-0 lg:pt-6 ${bottomPaddingClassName}`}>
        <article
          className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4"
          onClick={onContentClick}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>

        {children}
      </div>
    </section>
  );
}
