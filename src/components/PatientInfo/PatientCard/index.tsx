import { Patient } from '../../../store/actions';

export const PatientCard = (props: { selectedPatient: Patient | null }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="row g-0">
          <div className="col-4 d-flex justify-content-center align-items-center">
            <div>
              <img
                src="https://img.search.brave.com/eQO4oHIt-VIaessc-0xIhSI6gnZ6MK-LTkXTl1HH3_A/rs:fit:600:600:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg5L1BvcnRyYWl0/X1BsYWNlaG9sZGVy/LnBuZw"
                className="img-fluid rounded-start p-2 p-md-0"
                alt="user_profile"
              />
            </div>
          </div>
          <div className="col-8">
            <div className="card-body">
              <h4 className="card-title">
                Gender: {props.selectedPatient?.gender}
              </h4>
              <h4 className="card-title">Age: {props.selectedPatient?.age}</h4>
              <h4 className="card-title">
                Occupation: {props.selectedPatient?.occupation}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
