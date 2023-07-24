import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Container } from '@mui/material';
import useLocales from '../../hooks/useLocales';

import PostingProduct from '../../animations/product/postingproduct.json';

import FormProvider from '../../components/hook-form/FormProvider';
import RHFSelect from '../../components/hook-form/RHFSelect';
import RHFSwitch from '../../components/hook-form/RHFSwitch';
import RHFEditor from '../../components/hook-form/RHFEditor';
import RHFTextField from '../../components/hook-form/RHFTextField';
import RHFUploadMultiFile from '../../components/hook-form/RHFUploadMultiFile';
import { MotionContainer, varBounce } from '../../components/animate';
import animationSetter from '../../animations/animationSetter';
import animation from '../../animations/shared/arrow-left.json';
import BaseApi from '../../store/BaseApi';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

AdProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function AdProductForm({ isEdit, currentProduct, colors }) {
  const theme = useTheme();
  const { data } = BaseApi.useGetAllCategoriesQuery('api/category/');
  // const { data: colors } = BaseApi.useGetAllColorsQuery('api/product_color/');
  const [CreateProduct] = BaseApi.useCreateProductMutation();
  const [UpdateProduct] = BaseApi.useUpdateProductMutation();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    uploaded_images: Yup.array().min(1, 'Images is required'),
    quantity: Yup.number().required('quantity is required'),
    user: Yup.number().required('user is required'),
    category: Yup.number().required('category required'),
    color: Yup.array().min(1, 'color is required'),
    price: Yup.number().moreThan(0, 'Price should not be af-0.00'),
  });
  const currentColor = [];
  const demy = colors?.map((color) => {
    return currentProduct?.color?.map((currentProductColor) => {
      if (currentProductColor === color.id) {
        currentColor.push(color.name);
      }
      return currentProductColor;
    });
  });
  let currentImages = [];
  if (isEdit) {
    currentImages = currentProduct?.images.map((image) => {
      return image.image;
    });
  }
  const userId = localStorage.getItem('userId');
  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      uploaded_images: currentImages || [],
      quantity: currentProduct?.quantity || 0,
      user: currentProduct?.user || Number(userId),
      price: currentProduct?.price || 0,
      color: currentColor || [],
      category: currentProduct?.category || undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );
  const [snackOptions, setSnackOptions] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    backgroundColor: undefined,
    color: undefined,
    animation: undefined,
    message: undefined,
    animationPosition: undefined,
  });

  const handleSnackClose = () => {
    setSnackOptions({ ...snackOptions, open: false });
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);
  const selectedColor = [];

  const notImportent = values.color.map((valueColor) => {
    return colors?.map((gettedColor) => {
      if (valueColor === gettedColor.name) {
        selectedColor.push(gettedColor.id);
      }
      return valueColor;
    });
  });
  // const [currentOldImages, setCurrentOldImage] = useState(null);

  // const convertImageUrlToFile = (imageUrl) => {
  //   fetch(imageUrl)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const selectedFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
  //       // setFile(selectedFile);
  //       console.log('image: ', selectedFile);
  //       setCurrentOldImage(selectedFile);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const extra = currentProduct?.images.map((image) => {
  //   const imageUrl = image;
  //   // convertImageUrlToFile(imageUrl);
  // });
  // console.log(currentOldImages);
  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('name', values.name);
    const v = values.uploaded_images.map((image) => {
      if (image instanceof File) {
        return formData.append('uploaded_images', image, image.name);
      }
      return image;
    });
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('user', values.user);
    formData.append('quantity', values.quantity);
    formData.append('price', values.price);
    const d = selectedColor.map((color) => {
      return formData.append('color', color);
    });
    if (isEdit) {
      const query = {
        path: `/api/product/${currentProduct.id}/`,
        data: formData,
      };
      const res = await UpdateProduct(query);
      if (res.error) {
        console.log(res.error);
        enqueueSnackbar('error', { variant: 'error' });
      } else if (res.data) {
        enqueueSnackbar('Update success!');
      }
    } else {
      const query = {
        path: '/api/product/',
        data: formData,
      };
      const res = await CreateProduct(query);
      if (res.error) {
        console.log(res.error);
        enqueueSnackbar('error', { variant: 'error' });
      } else if (res.data) {
        enqueueSnackbar('Create success!');
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const images = values.uploaded_images || [];

      setValue('uploaded_images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.uploaded_images]
  );
  const handleRemoveAll = () => {
    setValue('uploaded_images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.uploaded_images && values.uploaded_images?.filter((_file) => _file !== file);

    setValue('uploaded_images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container component={MotionContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <m.div variants={varBounce().inLeft}>
                  <RHFTextField name="name" label={translate('Product Name')} />
                </m.div>

                <div>
                  <LabelStyle>{translate('Description')} </LabelStyle>
                  <RHFEditor simple name="description" />
                </div>
              </Stack>
              <div>
                <LabelStyle>{translate('Image')}</LabelStyle>
                <RHFUploadMultiFile
                  showPreview
                  files={values.uploaded_images}
                  name="uploaded_images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3} mt={2}>
                  <Typography>{translate('Select multiple Images')}</Typography>

                  <m.div variants={varBounce().inLeft}>
                    <RHFTextField name="quantity" label={translate('Product quantity')} type="number" />
                  </m.div>

                  <RHFSelect name="category" label={translate('Category')}>
                    {data?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </RHFSelect>
                  <m.div variants={varBounce().inLeft}>
                    <Controller
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          multiple
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={colors?.map((option) => option.name)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <TextField label={translate('Colors')} {...params} />}
                        />
                      )}
                    />
                  </m.div>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3} mb={2}>
                  <m.div variants={varBounce().inLeft}>
                    <RHFTextField
                      name="price"
                      label={translate('product Price')}
                      placeholder="0.00"
                      value={getValues('price') === 0 ? '' : getValues('price')}
                      onChange={(event) => setValue('price', Number(event.target.value))}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">AF</InputAdornment>,
                        type: 'number',
                      }}
                    />
                  </m.div>
                </Stack>
              </Card>
              <m.div variants={varBounce().inUp}>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? translate('Create Product') : translate('Save Changes')}
                </LoadingButton>
              </m.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
