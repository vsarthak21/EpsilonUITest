import axios from "axios";
import { useState } from "react";
import "./TableComponent.css";

const Table = () => {
  const [order, setOrder] = useState("sort");
  const [data, setData] = useState([]);

  useState(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json"
      )
      .then((res) => {
        setData(res.data.cookies);
      })
      .catch((error) => alert(error));
  }, []);

  const sorting = (col) => {
    if (order === "sort" || order === "sort-down") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("sort-up");
    }
    if (order === "sort-up") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("sort-down");
    }
  };

  return (
    data.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>
              Product Name
              <i
                onClick={() => sorting("name")}
                className={`fas fa-${order} icon`}
              ></i>
            </th>
            <th>
              Price
              <i
                onClick={() => sorting("price")}
                className={`fas fa-${order} icon`}
              ></i>
            </th>
            <th>
              Category
              <i
                onClick={() => sorting("category")}
                className={`fas fa-${order} icon`}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...data].map((p) => (
            <tr>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default Table;
