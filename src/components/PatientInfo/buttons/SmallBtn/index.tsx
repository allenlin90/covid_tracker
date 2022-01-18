import style from './SmallBtn.module.css';

interface SmallBtnProps {
  canEdit: boolean;
  disabled?: boolean;
  clickHandler: React.MouseEventHandler;
}

export const SmallBtn = ({
  canEdit = false,
  disabled = false,
  clickHandler,
}: SmallBtnProps): JSX.Element => {
  if (canEdit) {
    return (
      <button
        form="patient_info"
        type="button"
        className={`btn btn-success ${style.upper_right} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={clickHandler}
      >
        Confirm Edit
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`btn btn-danger ${style.upper_right}`}
      onClick={clickHandler}
    >
      Remove Patient
    </button>
  );
};
