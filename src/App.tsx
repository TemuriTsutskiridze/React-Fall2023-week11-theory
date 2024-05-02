import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormType {
  firstName: string;
  lastName: string;
}

const schema = yup.object({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Email is not valid"
    ),
});

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormType> = (data) => {
    console.log(data);
  };

  const firstName = watch("firstName");
  if (firstName.length > 4) {
    setValue("firstName", "temo");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("firstName")} />
        {errors.firstName ? <p>{errors.firstName.message}</p> : null}

        <input type="text" {...register("lastName")} />
        {errors.lastName ? <p>{errors.lastName.message}</p> : null}

        <input type="text" {...register("email")} />
        {errors.email ? <p>{errors.email.message}</p> : null}
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
