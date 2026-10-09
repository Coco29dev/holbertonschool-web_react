import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center max-[520px]:flex-col max-[520px]:text-center">
      <img src={holbertonLogo} alt="holberton logo" className="h-63 w-63 max-[912px]:h-48 max-[912px]:w-48 max-[520px]:h-36 max-[520px]:w-36" />
      <h1 className="text-5xl font-bold text-(--main-color) max-[912px]:text-4xl max-[520px]:text-2xl">School Dashboard</h1>
    </div>
  );
}

export default Header;
