import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center">
      <img src={holbertonLogo} alt="holberton logo" className="h-63 w-63" />
      <h1 className="text-5xl font-bold text-(--main-color)">School Dashboard</h1>
    </div>
  );
}

export default Header;
