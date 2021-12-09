import s from './Header.module.css';

const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.logoWrapper}>
        <h2 className={s.logo}>ET</h2>
      </div>
      <div className={s.titleWrapper}>
        <h3 className={s.title}>Email Templater</h3>
      </div>
    </div>
  );
};
export default Header;
