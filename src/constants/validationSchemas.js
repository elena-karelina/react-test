import * as yup from 'yup';

export const loginConditionalValidationSchema = (codePresent) => yup.object().shape({
  phone: yup
    .string()
    .required('Поле обязательно к заполнению')
    .matches(/^[0-9]*$/, 'Введите только цифры'),
  ...(codePresent && {
    code: yup
      .string()
      .required('Поле обязательно к заполнению')
      .matches(/^[0-9]*$/, 'Введите только цифры')
      .min(6, 'Введите код из 6 символов')
      .max(6, 'Введите код из 6 символов'),
  }),
});

export const profileValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .required('Поле обязательно к заполнению')
    .matches(/^[0-9]*$/, 'Введите только цифры'),
  lastname: yup.string(),
  firstname: yup.string(),
  middlename: yup.string(),
  email: yup.string().email('Введите корректный адрес электронной почты'),
  city: yup.string(),
});
