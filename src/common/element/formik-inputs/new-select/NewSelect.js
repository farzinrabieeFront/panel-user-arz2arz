import { forwardRef } from "react"; 
import { Form } from "react-bootstrap";
import { ErrorMessage, useField } from "formik"; 

//sample={id='',title:'',disabled:false}

const NewSelect = forwardRef(
  (
    {
      label /** string */,
      className,
      labelClassName,
      options /** array */,
      showField = "title" /** string */,
      fieldValue = "_id" /** string */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      data /** string */,
      light,
      ...props
    },
    ref
  ) => {
    const [{ name, ...field }, { error, touched }] = useField(props);
     

    return (
      <Form.Group className={`position-relative mb-0`}>
        {label ? (
          <Form.Label
             
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <Form.Control
          as="select"
           
          name={name}
          {...field}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)} 

          {...props}
        >
          <option value={-1} hidden>  انتخاب کنید  </option>
          {options[0] instanceof Object
            ? options.map((item) => (
              <option
                value={item[fieldValue]}
                key={item[showField]}
                disabled={item.disabled}
              >
                {item[showField]}
              </option>
            ))
            : options.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </Form.Control>
       
      </Form.Group>
    );
  }
);
export default NewSelect;