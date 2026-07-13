export function FilterPill({ label, active, onClick, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  let activeClasses;
  if (active) {
    activeClasses = 'bg-gradient-to-r from-primary to-fuchsia-500 text-text-inverse shadow-md shadow-primary/30';
  } else {
    activeClasses = 'border border-border-strong bg-surface text-text-muted hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary';
  }

  let disabledClasses;
  if (disabled) {
    disabledClasses = 'cursor-not-allowed opacity-60 hover:translate-y-0 hover:border-border-strong hover:text-text-muted';
  } else {
    disabledClasses = '';
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${activeClasses} ${disabledClasses}`}
    >
      {label}
    </button>
  );
}
