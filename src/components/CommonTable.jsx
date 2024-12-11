import { MaterialReactTable } from "material-react-table";

export const CommonTable = ({ columns, data }) => {
  return <MaterialReactTable columns={columns} data={data} />;
};
