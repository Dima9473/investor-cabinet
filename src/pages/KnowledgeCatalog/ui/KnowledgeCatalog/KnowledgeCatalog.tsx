import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Card } from 'shared/ui/Card';
import { EmptyState } from 'shared/ui/EmptyState';
import { Icon } from 'shared/ui/Icon';
import { INDICATORS } from 'pages/KnowledgeCatalog/lib/constants/indicators';

export const KnowledgeCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('Все');
  const search = searchParams.get('q') ?? '';
  const categories = ['Все', ...new Set(INDICATORS.map((item) => item.category))];
  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('ru-RU');
    return INDICATORS.filter((item) => {
      const inCategory = category === 'Все' || item.category === category;
      const inSearch =
        normalizedSearch.length === 0 ||
        `${item.name} ${item.description} ${item.category}`
          .toLocaleLowerCase('ru-RU')
          .includes(normalizedSearch);
      return inCategory && inSearch;
    });
  }, [category, search]);

  return (
    <div className="knowledge-page">
      <Card className="knowledge-hero">
        <div>
          <span>База знаний</span>
          <h2>Разбирайтесь в показателях портфеля</h2>
          <p>
            Короткие материалы о доходности, рисках и данных, которые
            используются в кабинете.
          </p>
        </div>
        <label className="knowledge-search">
          <Icon name="search" />
          <input
            aria-label="Поиск по каталогу знаний"
            onChange={(event) => {
              const value = event.target.value;
              setSearchParams(value ? { q: value } : {});
            }}
            placeholder="Найти термин или показатель"
            type="search"
            value={search}
          />
        </label>
      </Card>

      <div aria-label="Темы" className="category-filter" role="group">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            className={category === item ? 'is-selected' : undefined}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <section className="knowledge-grid" aria-label="Материалы">
          {filtered.map((indicator, index) => (
            <Card
              as="article"
              className={`knowledge-card ${index === 0 ? 'knowledge-card--featured' : ''}`}
              key={indicator.id}
            >
              <div className="knowledge-card__topline">
                <span>{indicator.category}</span>
                <i>
                  <Icon name={indicator.icon} />
                </i>
              </div>
              <h3>{indicator.name}</h3>
              <p>{indicator.description}</p>
              <footer>
                <span>{indicator.minutes} минут</span>
                <span>Короткая справка</span>
              </footer>
            </Card>
          ))}
        </section>
      ) : (
        <Card className="page-state-card">
          <EmptyState
            description="Попробуйте другой запрос или выберите все темы."
            icon="search"
            title="Материалы не найдены"
          />
        </Card>
      )}

      <Card className="data-source-note">
        <Icon name="database" />
        <div>
          <strong>Откуда берутся данные</strong>
          <p>
            Позиции, операции и котировки приходят из T‑Invest API через
            серверную часть кабинета. Расчётные показатели помечаются
            отдельно.
          </p>
        </div>
      </Card>
    </div>
  );
};
