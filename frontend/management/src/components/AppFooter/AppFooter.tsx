const currentYear = new Date().getFullYear();

const Footer = () => {
 
  return (
    <div className="bg-slate-700 text-white py-3">
      <div className="inline-flex justify-center w-full">
        <p>Conditions of Use</p>
        <p className="mx-3">Privacy Notice</p>
        <p>Interest-Based Ads</p>
      </div>
      <div className="flex justify-center font-light">&copy;{currentYear} by pdcthanh</div>
    </div>
  );
};

export default Footer;
