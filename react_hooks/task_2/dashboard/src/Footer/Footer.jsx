import { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

function Footer() {
  const { user } = useContext(newContext);

  return (
    <div className="App-footer mt-auto border-t-3 border-(--main-color) bg-white py-5 text-center">
      <p className="text-xl italic max-[912px]:text-lg max-[520px]:text-sm">
        Copyright {getCurrentYear()} {getFooterCopy(false)}
      </p>
      {user.isLoggedIn && (
        <p className="text-xl max-[912px]:text-lg max-[520px]:text-sm">
          <a href="#" className="underline">
            Contact us
          </a>
        </p>
      )}
    </div>
  );
}

export default Footer;
