import "./Table.css";
const Table = ({ userData, setUserData, setFormData }) => {
  const deleteData = (i) => {
    let newData = userData.filter((obj, index) => i != index);
    setUserData(newData);
  };

  const updateData = (i) => {
   let editData = userData.filter((v,index)=> i == index)[0];
   editData['index'] = i;
   setFormData(editData);
  };
  return (
    <>
      <h2 className="fw-bold text-uppercase mb-2">Table list</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sl. no</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Buttons</th>
          </tr>
        </thead>

        <tbody>
          {userData.length !== 0 ? (
            userData.map((d, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{d.index + 1}</th>
                  <td>{d.uname}</td>
                  <td>{d.uemail}</td>
                  <td>{d.uphone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary edit"
                      onClick={() => updateData(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteData(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <p w-full>No data forund</p>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export { Table };
