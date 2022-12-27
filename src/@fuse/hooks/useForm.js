import { useCallback, useState } from "react";
import _ from "@lodash";
import moment from "moment";

function useForm(initialState, onSubmit) {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      event.persist();
      let date = new Date();
      if (event.target.type === "date") {
        try {
          date = new Date(event.target.value);
        } catch (error) {
          date = undefined;
        }
      }
      if (event.target.type === "datetime-local") {
        try {
          date = new Date(event.target.value);
        } catch (error) {
          date = undefined;
        }
      }
      if (event.target.type === "time") {
        try {
          if (
            form[event.target.name] !== undefined &&
            form[event.target.name] !== null
          ) {
            date = new Date(form[event.target.name]);
          } else {
            date = new Date();
          }

          const time = event.target.value.split(":");
          date.setHours(Number(time[0]));
          date.setMinutes(Number(time[1]));
        } catch (error) {
          date = undefined;
        }
      }
      if (date === undefined || date.toString() === "Invalid Date") return;

      setForm((form) => ({
        ...form,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.type === "date" ||
              event.target.type === "time" ||
              event.target.type === "datetime-local"
            ? date.toISOString()
            : event.target.type === "number"
            ? Number(event.target.value)
            : event.target.value,
      }));
    },
    [form]
  );

  //   const handleChangeDate = useCallback((event) => {
  //     event.persist();
  //     const date = new Date(event.target.value);

  //     setForm((form) => ({
  //       ...form,
  //       [event.target.name]: date.toISOString(),
  //     }));
  //   }, []);

  const resetForm = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  const setInForm = useCallback((name, value) => {
    setForm((form) => _.setIn(form, name, value));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setInForm,
  };
}

export default useForm;
