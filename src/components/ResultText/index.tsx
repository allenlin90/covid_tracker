export interface ResultTextProps {
  success: boolean;
  isRequestSent: boolean;
  isLoading: boolean;
}

export const ResultText = ({
  success = false,
  isRequestSent = false,
  isLoading = false,
}: ResultTextProps): JSX.Element | null => {
  if (success && isRequestSent && !isLoading) {
    return (
      <h1 className={`text-center`}>
        <span className={`badge bg-success`}>Success</span>
      </h1>
    );
  }

  // failed to create a new patient
  if (!success && isRequestSent && !isLoading) {
    return (
      <h1 className={`text-center`}>
        Sorry, service is currently unavailable...
      </h1>
    );
  }

  return null;
};
