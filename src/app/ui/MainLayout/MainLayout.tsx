import { DEMO_MODE } from 'lib/constants/env';
import { useTheme } from 'lib/useTheme';
import { FormEvent, useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';

import { useInvestorAccounts } from 'shared/api/investor';
import {
  ANALYTICS_ROUTE,
  KNOWLEDGE_CATALOG_ROUTE,
  OPERATIONS_ROUTE,
  OVERVIEW_ROUTE,
  PORTFOLIO_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { Icon, IconName } from 'shared/ui/Icon';
import { InvestorOutletContext } from './context';

type NavigationItem = {
  icon: IconName;
  label: string;
  mobileLabel: string;
  path: string;
};

const navigation: NavigationItem[] = [
  { icon: 'dashboard', label: 'Обзор', mobileLabel: 'Главная', path: OVERVIEW_ROUTE },
  { icon: 'portfolio', label: 'Портфель', mobileLabel: 'Портфель', path: PORTFOLIO_ROUTE },
  { icon: 'operations', label: 'Операции', mobileLabel: 'Операции', path: OPERATIONS_ROUTE },
  { icon: 'analytics', label: 'Аналитика', mobileLabel: 'Аналитика', path: ANALYTICS_ROUTE },
  { icon: 'book', label: 'Каталог знаний', mobileLabel: 'Знания', path: KNOWLEDGE_CATALOG_ROUTE },
];

const pageTitles: Record<string, string> = {
  [ANALYTICS_ROUTE]: 'Аналитика',
  [KNOWLEDGE_CATALOG_ROUTE]: 'Каталог знаний',
  [OPERATIONS_ROUTE]: 'Операции',
  [OVERVIEW_ROUTE]: 'Обзор',
  [PORTFOLIO_ROUTE]: 'Портфель',
};

export const MainLayout = () => {
  const { changeTheme, theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const accountsQuery = useInvestorAccounts();
  const allAccounts = accountsQuery.data?.data.accounts ?? [];
  const accounts = allAccounts.filter(
    (item) =>
      item.status === 'open' && (item.type === 'broker' || item.type === 'iis'),
  );
  const unsupportedAccountsCount = allAccounts.length - accounts.length;
  const [accountId, setAccountId] = useState<string>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!accounts.some((item) => item.id === accountId)) {
      setAccountId(accounts[0]?.id);
    }
  }, [accountId, accounts]);

  const title = pageTitles[location.pathname] ?? 'Кабинет инвестора';
  const account = accounts.find((item) => item.id === accountId);
  const outletContext: InvestorOutletContext = {
    account,
    accountId,
    accounts,
    accountsError: accountsQuery.error,
    accountsLoading: accountsQuery.isPending,
    generatedAt: accountsQuery.data?.meta.generatedAt,
    refetchAccounts: () => {
      void accountsQuery.refetch();
    },
    unsupportedAccountsCount,
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = search.trim();
    void navigate(
      query
        ? `${KNOWLEDGE_CATALOG_ROUTE}?q=${encodeURIComponent(query)}`
        : KNOWLEDGE_CATALOG_ROUTE,
    );
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink aria-label="Кабинет инвестора" className="brand-mark" to={OVERVIEW_ROUTE}>
          L
        </NavLink>
        <nav aria-label="Основная навигация">
          {navigation.map((item) => (
            <NavLink aria-label={item.label} key={item.path} to={item.path}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-source" title="Источник данных: T‑Банк">
          T
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div className="app-header__title">
            <span>Кабинет инвестора</span>
            <div>
              <h1>{title}</h1>
              {DEMO_MODE && <b className="demo-badge">Демо-данные</b>}
            </div>
          </div>
          <form className="header-search" onSubmit={handleSearch}>
            <Icon name="search" />
            <input
              aria-label="Поиск по базе знаний"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск"
              type="search"
              value={search}
            />
          </form>
          {accounts.length > 0 && (
            <label className="account-select">
              <span>Счёт</span>
              <select
                aria-label="Брокерский счёт"
                onChange={(event) => setAccountId(event.target.value)}
                value={accountId ?? ''}
              >
                {accounts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} />
            </label>
          )}
          <button
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
            aria-pressed={theme === 'dark'}
            className="icon-button"
            onClick={changeTheme}
            type="button"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <span aria-label="Профиль Дмитрия" className="user-avatar" role="img">
            Д
          </span>
        </header>

        <main className="page-content">
          <Outlet context={outletContext} />
        </main>
      </div>

      <nav aria-label="Мобильная навигация" className="bottom-navigation">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <Icon name={item.icon} />
            <span>{item.mobileLabel}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
