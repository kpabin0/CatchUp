const FormWrapper = (props: any) => {

    return (
      <section className="min-h-screen min-w-full flex flex-col justify-evenly items-center">
          <div className={"min-w-[25rem] p-4 bg-theme-w shadow-xl rounded-md border " + (props?.ostyle)}>
              <h1 className="text-3xl text-center my-6 text-theme uppercase font-extrabold">{props?.title ? props.title : "Form"}</h1>
              {props?.children}
          </div>
      </section>
    );
  };
  
  export default FormWrapper;
    
  