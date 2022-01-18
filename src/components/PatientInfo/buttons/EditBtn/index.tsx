import style from './EditBtn.module.css';

interface EditBtnProps {
  canEdit: boolean;
  clickHandler?: React.MouseEventHandler;
}

export const EditBtn = ({ canEdit = false, clickHandler }: EditBtnProps) => {
  return (
    <span className={style.edit_btn} onClick={clickHandler}>
      <i className={!canEdit ? 'far fa-edit' : 'fas fa-times'}></i>
    </span>
  );
};
