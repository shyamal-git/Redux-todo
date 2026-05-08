import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { fetchProducts } from "../features/products/productsSlice";
import {
  selectProducts,
  selectProductsTotal,
} from "../features/products/productsSelectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const total = useSelector(selectProductsTotal);
  const lowStock = products.filter((product) => product.stock <= 10).length;
  const categories = new Set(products.map((product) => product.category)).size;

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

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
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Product inventory overview from Redux state.
          </Typography>
        </Box>

        <Button component={RouterLink} to="/products" variant="contained">
          Manage Products
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total records</Typography>
              <Typography variant="h3" fontWeight={700}>
                {total}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Loaded in table</Typography>
              <Typography variant="h3" fontWeight={700}>
                {products.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Categories shown</Typography>
              <Typography variant="h3" fontWeight={700}>
                {categories}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {lowStock} low-stock products
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
