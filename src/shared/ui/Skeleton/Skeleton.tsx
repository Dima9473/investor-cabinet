type SkeletonProps = {
  cards?: number;
};

export const Skeleton = ({ cards = 4 }: SkeletonProps) => (
  <div aria-label="Загрузка данных" className="skeleton-grid" role="status">
    {Array.from({ length: cards }).map((_, index) => (
      <div className="skeleton-card" key={index}>
        <span />
        <span />
        <span />
      </div>
    ))}
  </div>
);
