import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { User } from "../types/userTypes";
import { useState } from "react";
import Spinner from "./Spinner";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";
import Error from "../components/Error";
import { ROWS_PER_PAGE } from "../constants/constants";

const tableCellStyle = {
  border: "1px solid black",
  width: "50px",
};

const UsersTable = () => {
  const [page, setPage] = useState<number>(0);
  const { isLoading, error, data } = useFetchUsers(page);
  const navigate: NavigateFunction = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner />;

  if (error) return <Error error={"Error occurred: Error fetching users"} />;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={tableCellStyle}>
              ID
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              Name
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              Email
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              Address
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users.map((user: User) => (
            <TableRow
              key={user.id}
              onClick={() => navigate(`/userPosts/${user.id}`)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "lightgray",
                },
              }}
            >
              <TableCell align="center" sx={tableCellStyle}>
                {user.id}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {user.name}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {user.email}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                <>
                  <div>
                    <strong>Street:</strong> {user.address.street}
                  </div>
                  <div>
                    <strong>City: </strong>
                    {user.address.city}
                  </div>
                  <div>
                    <strong>Suite: </strong>
                    {user.address.suite}
                  </div>
                  <div>
                    <strong>Zipcode:</strong> {user.address.zipcode}
                  </div>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ border: "1px solid black" }}
        component="div"
        count={data?.totalUserCount!}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        nextIconButtonProps={{ disabled: data?.users?.length! < ROWS_PER_PAGE }}
      />
    </TableContainer>
  );
};

export default UsersTable;
