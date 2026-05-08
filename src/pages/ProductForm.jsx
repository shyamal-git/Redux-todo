import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../features/products/productsSlice";
import {
  selectProductById,
  selectProductsError,
  selectProductsLoading,
  selectProductsSaving,
} from "../features/products/productsSelectors";

const schema = yup.object({
  title: yup.string().required("Product title is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  description: yup.string().required("Description is required"),
});

const defaultValues = {
  title: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById(id));
  const loading = useSelector(selectProductsLoading);
  const saving = useSelector(selectProductsSaving);
  const error = useSelector(selectProductsError);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEdit && !product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isEdit, product]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || product.title || "",
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    const result = isEdit
      ? await dispatch(updateProduct({ id, productData }))
      : await dispatch(createProduct(productData));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(isEdit ? "Product updated" : "Product created");
      navigate("/products");
    } else {
      toast.error(result.payload);
    }
  };

  if (isEdit && loading && !product) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {isEdit ? "Edit Product" : "Add Product"}
        </Typography>
        <Typography color="text.secondary">
          {isEdit
            ? "Update product details and sync the result back to Redux."
            : "Create a product through DummyJSON and add it to Redux state."}
        </Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              <Box>
                <TextField
                  label="Title"
                  fullWidth
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Box>

              <Box>
                <TextField
                  label="Brand"
                  fullWidth
                  {...register("brand")}
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              </Box>

              <Box>
                <TextField
                  label="Category"
                  fullWidth
                  {...register("category")}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              </Box>

              <Box>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  {...register("price")}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Box>

              <Box>
                <TextField
                  label="Stock"
                  type="number"
                  fullWidth
                  {...register("stock")}
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                />
              </Box>

              <Box sx={{ gridColumn: "1 / -1" }}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Box>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button component={RouterLink} to="/products">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? "Saving..." : "Save Product"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProductForm;
