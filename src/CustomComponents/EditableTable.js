import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

// ✅ Replace the old imports with simple functions
const randomTraderName = () => {
  const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Sophia", "Liam"];
  return names[Math.floor(Math.random() * names.length)];
};

const randomCreatedDate = () => {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomUpdatedDate = () => {
  return new Date();
};

export default function BasicEditingGrid() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Name", minWidth: 200, editable: true, flex: 1 },
  { field: "age", headerName: "Age", type: "number", editable: true, flex: 1 },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    flex: 1,
    minWidth: 200,
    editable: true,
    valueGetter: (params) => params.value?.toLocaleDateString(), // show nicely
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    flex: 1,
    minWidth: 200,
    editable: true,
    valueGetter: (params) => params.value?.toLocaleString(),
  },
];

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
