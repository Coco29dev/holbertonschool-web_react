function Login() {
  return (
    <div className="App-body border-t-3 border-(--main-color) pt-6 pb-80 pl-10">
      <p className="mb-8 text-xl">Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-2 text-lg">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="h-[30px] w-52 rounded border border-gray-500 px-1"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="h-[30px] w-52 rounded border border-gray-500 px-1"
        />
        <button type="button" className="rounded border border-gray-500 px-1">
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
