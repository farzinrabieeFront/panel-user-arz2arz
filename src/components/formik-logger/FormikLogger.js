export default function FormikLogger({ handleChange }) {
  const formik = useFormikContext();
  useEffect(() => {
    console.group("Formik State");
    console.log("values", formik.values);
    // console.log("errors", formik.errors);
    // console.log("touched", formik.touched);
    // console.log("isSubmitting", formik.isSubmitting);
    // console.log("isValidating", formik.isValidating);
    // console.log("submitCount", formik.submitCount);
    console.groupEnd();
    handleChange(formik.values);
  }, [
    formik.values,
    // formik.errors,
    // formik.touched,
    // formik.isSubmitting,
    // formik.isValidating,
    // formik.submitCount
  ]);
  return null;
}