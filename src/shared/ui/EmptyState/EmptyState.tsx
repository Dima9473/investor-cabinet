import { Icon, IconName } from 'shared/ui/Icon';

type EmptyStateProps = {
  action?: { label: string; onClick: () => void };
  description: string;
  icon?: IconName;
  title: string;
};

export const EmptyState = ({
  action,
  description,
  icon = 'info',
  title,
}: EmptyStateProps) => (
  <div className="empty-state" role="status">
    <span className="empty-state__icon">
      <Icon name={icon} size={24} />
    </span>
    <strong>{title}</strong>
    <p>{description}</p>
    {action && (
      <button className="button button--secondary" onClick={action.onClick} type="button">
        <Icon name="refresh" size={17} />
        {action.label}
      </button>
    )}
  </div>
);
