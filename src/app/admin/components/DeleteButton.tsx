"use client";

interface DeleteButtonProps {
  children: React.ReactNode;
  confirmMessage?: string;
}

export function DeleteButton({
  children,
  confirmMessage = "Are you sure you want to delete this?"
}: DeleteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirm(confirmMessage)) {
      e.preventDefault();
    }
  };

  return (
    <button type="submit" onClick={handleClick} className="admin-btn admin-btn-danger">
      {children}
    </button>
  );
}
