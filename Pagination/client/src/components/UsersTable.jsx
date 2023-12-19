import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const getData = async () => {
    const res = await axios.get(`http://localhost:3000/?page=${page}`);
    const data = res.data;
    setUsers(data.users);
    setPageNumbers(
      Array.from({ length: data.totalPages }, (_, index) => index + 1)
    );
  };
  useEffect(() => {
    getData();
  }, [page]);

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };
  const handleNextClick = () => {
    setPage((prevPage) => (prevPage === pageNumbers.at(-1) ? prevPage : prevPage + 1));
  };

  return (
    <div className="table-div">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">User Name</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={handlePrevClick}>
              Previous
            </button>
          </li>
          {pageNumbers?.map((item, index) => {
            return (
              <button
                key={index}
                className="page-item"
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            );
          })}
          <li className="page-item">
            <button className="page-link" onClick={handleNextClick}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UsersTable;
