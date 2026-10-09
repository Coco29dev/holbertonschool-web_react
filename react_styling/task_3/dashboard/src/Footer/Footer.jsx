import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer fixed inset-x-3 bottom-0 border-t-3 border-(--main-color) bg-white py-5 text-center">
      <p className="text-xl italic">
        Copyright {getCurrentYear()} {getFooterCopy(false)}
      </p>
    </div>
  );
}

export default Footer;
