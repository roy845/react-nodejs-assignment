import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  TablePagination,
  Paper,
} from "@mui/material";
import { Post } from "../types/postTypes";
import { ROWS_PER_PAGE } from "../constants/constants";

type UserPostsTableProps = {
  posts: Post[];
  selectedPost: number;
  onDeletePost: (postId: number) => void;
  isDeleting: boolean;
  page: number;
  totalPosts: number;
  onPageChange: (newPage: number) => void;
};

const tableCellStyle = {
  border: "1px solid black",
  width: "50px",
  align: "center",
};

const UserPostsTable: React.FC<UserPostsTableProps> = ({
  posts,
  selectedPost,
  onDeletePost,
  isDeleting,
  page,
  totalPosts,
  onPageChange,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user posts table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={tableCellStyle}>
              ID
            </TableCell>
            <TableCell align="center" style={tableCellStyle}>
              Title
            </TableCell>
            <TableCell align="center" style={tableCellStyle}>
              Body
            </TableCell>
            <TableCell align="center" style={tableCellStyle}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{
                "&:hover": { backgroundColor: "lightgray" },
                cursor: "pointer",
              }}
            >
              <TableCell align="center" style={tableCellStyle}>
                {post.id}
              </TableCell>
              <TableCell align="center" style={tableCellStyle}>
                {post.title}
              </TableCell>
              <TableCell align="center" style={tableCellStyle}>
                {post.body}
              </TableCell>
              <TableCell align="center" style={tableCellStyle}>
                <Button
                  disabled={isDeleting && selectedPost === post.id}
                  variant="contained"
                  color="error"
                  onClick={() => onDeletePost(post.id)}
                >
                  {isDeleting && selectedPost === post.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ border: "1px solid black" }}
        component="div"
        count={totalPosts}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={(event, newPage) => onPageChange(newPage)}
        rowsPerPageOptions={[]}
        nextIconButtonProps={{
          disabled: posts.length < ROWS_PER_PAGE,
        }}
      />
    </TableContainer>
  );
};

export default UserPostsTable;
