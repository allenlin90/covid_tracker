import style from './LargeBtn.module.css';

interface LargeBtnProps {
  canEdit: boolean;
  disabled?: boolean;
  clickHandler?: React.MouseEventHandler;
}

export const LargeBtn = ({
  canEdit = false,
  disabled = false,
  clickHandler,
}: LargeBtnProps): JSX.Element => {
  if (canEdit) {
    return (
      <button
        form="patient_info"
        type="button"
        className={`btn btn-success ${style.patient_remover_bg} ${
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
      className={`btn btn-danger ${style.patient_remover_bg}`}
      onClick={clickHandler}
    >
      Remove Patient
    </button>
  );
};
