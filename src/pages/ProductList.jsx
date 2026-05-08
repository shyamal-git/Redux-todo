import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productsSlice";
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductsSaving,
  selectProductsTotal,
} from "../features/products/productsSelectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const total = useSelector(selectProductsTotal);
  const loading = useSelector(selectProductsLoading);
  const saving = useSelector(selectProductsSaving);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Delete "${product.title}"?`);

    if (!confirmed) {
      return;
    }

    const result = await dispatch(deleteProduct(product.id));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Product deleted");
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Products
          </Typography>
          <Typography color="text.secondary">
            Read, create, update, and delete products through Redux thunks.
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/products/new"
          variant="contained"
        >
          Add Product
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Typography color="text.secondary">Total records</Typography>
              <Typography variant="h3" fontWeight={700}>
                {total}
              </Typography>
            </Box>
            <Chip label={`${products.length} loaded`} color="primary" />
          </Stack>
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={product.thumbnail}
                        alt={product.title}
                        variant="rounded"
                      />
                      <Box>
                        <Typography fontWeight={700}>{product.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {product.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand || "N/A"}</TableCell>
                  <TableCell align="right">${product.price}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="right">{product.rating}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit product">
                      <Button
                        component={RouterLink}
                        to={`/products/${product.id}/edit`}
                        size="small"
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete product">
                      <span>
                        <Button
                          color="error"
                          disabled={saving}
                          size="small"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </Button>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ProductList;
