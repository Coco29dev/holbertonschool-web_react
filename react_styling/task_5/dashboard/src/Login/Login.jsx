function Login() {
  return (
    <div className="App-body border-t-3 border-(--main-color) pt-6 pb-80 pl-10 max-[912px]:pb-10 max-[520px]:pl-0">
      <p className="mb-8 text-xl max-[520px]:mb-4 max-[520px]:text-lg">Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-2 text-lg max-[520px]:flex-col max-[520px]:items-start">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="h-[30px] w-52 rounded border border-gray-500 px-1 max-[520px]:w-full"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="h-[30px] w-52 rounded border border-gray-500 px-1 max-[520px]:w-full"
        />
        <button type="button" className="rounded border border-gray-500 px-1 max-[520px]:w-full">
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
