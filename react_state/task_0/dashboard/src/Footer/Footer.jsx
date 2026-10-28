import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto border-t-3 border-(--main-color) bg-white py-5 text-center">
      <p className="text-xl italic max-[912px]:text-lg max-[520px]:text-sm">
        Copyright {getCurrentYear()} {getFooterCopy(false)}
      </p>
    </div>
  );
}

export default Footer;
