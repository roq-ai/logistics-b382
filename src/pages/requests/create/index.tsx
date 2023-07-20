import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRequest } from 'apiSdk/requests';
import { requestValidationSchema } from 'validationSchema/requests';
import { UserInterface } from 'interfaces/user';
import { WarehouseInterface } from 'interfaces/warehouse';
import { ContainerInterface } from 'interfaces/container';
import { getUsers } from 'apiSdk/users';
import { getWarehouses } from 'apiSdk/warehouses';
import { getContainers } from 'apiSdk/containers';
import { RequestInterface } from 'interfaces/request';

function RequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRequest(values);
      resetForm();
      router.push('/requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RequestInterface>({
    initialValues: {
      status: '',
      customer_id: (router.query.customer_id as string) ?? null,
      warehouse_id: (router.query.warehouse_id as string) ?? null,
      container_id: (router.query.container_id as string) ?? null,
    },
    validationSchema: requestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Requests',
              link: '/requests',
            },
            {
              label: 'Create Request',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<WarehouseInterface>
            formik={formik}
            name={'warehouse_id'}
            label={'Select Warehouse'}
            placeholder={'Select Warehouse'}
            fetcher={getWarehouses}
            labelField={'name'}
          />
          <AsyncSelect<ContainerInterface>
            formik={formik}
            name={'container_id'}
            label={'Select Container'}
            placeholder={'Select Container'}
            fetcher={getContainers}
            labelField={'status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/requests')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'request',
    operation: AccessOperationEnum.CREATE,
  }),
)(RequestCreatePage);
