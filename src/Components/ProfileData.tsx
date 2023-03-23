export const ProfileData = (props: any) => {
  return (
    <>
      <p>
        <strong>Name: </strong> {props.graphData.displayName}
      </p>
      <p>
        <strong>Id: </strong> {props.graphData.id}
      </p>
    </>
  );
};
