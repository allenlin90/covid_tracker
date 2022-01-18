import style from './Spinner.module.css';

export const Spinner = ({ isLoading = true }: { isLoading?: boolean }) => {
  return (
    <div
      className={`flex-column justify-content-center align-items-center ${
        isLoading ? style.display_flex : style.display_none
      }`}
    >
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>Loading...</div>
    </div>
  );
};
