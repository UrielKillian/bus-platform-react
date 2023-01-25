import { ErrorMessage, Field, Form, Formik } from "formik";
import { redirect } from "react-router-dom";
import ErrorMessage1Component from "../../shared/components/messages/ErrorMessages/error-message.component.tsx";
import AlertMessage1Component from "../../shared/components/messages/AlertMessages/alert-message-1.component.tsx";
import * as Yup from "yup";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default function AuthView() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(
        <ErrorMessage1Component
          message={"Correo electrónico no válido"}
          item_1={"El correo debe tener un dominio válido."}
          item_2={"Revisa que el correo ingresado sea el correcto."}
        />
      )
      .required(<AlertMessage1Component message={"El correo es requerido."} />),
    password: Yup.string().required(
      <AlertMessage1Component message={"La contraseña es requerida"} />
    ),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto "
                src="https://www.redbus.pe/i/59538b35953097248522a65b4b79650e.png"
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Ingresa en tu cuenta
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div></div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await onSubmit(values);
                  resetForm();
                }}
              >
                <Form>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Correo
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="correo@dominio.com"
                          className="input block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className="mt-1 ">
                          <ErrorMessage name="email" render={renderError} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contraseña
                      </label>
                      <div className="mt-1">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="email"
                          required
                          className="input block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className="mt-1 ">
                          <ErrorMessage name="password" render={renderError} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-pal1 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Recuerdame
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="/remember"
                          className="font-medium text-pal3 hover:text-red-700"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        oncClick={() => {
                          redirect("/platform");
                        }}
                        type="submit"
                        className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-pal3 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pal3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <ArrowLeftOnRectangleIcon className=" h-5 w-5 text-white mr-2" />
                        <label className="">Ingresar</label>
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
