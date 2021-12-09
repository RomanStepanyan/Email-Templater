import { useNavigate } from 'react-router-dom';

import s from './Values.module.css';

const Values = props => {
  const bodyInput = props.bodyInput;
  const inputValues = props.inputValues;

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    props.setInputValues(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const backButtonOnClick = event => {
    event.preventDefault();
    navigate('/');
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.setInputValues({ ...props.inputValues });
    navigate('/preview');
  };

  return (
    <div className={s.container}>
      <div className={s.listWrapper}>
        <ol className={s.list}>
          <li className={s.listItem}>Compose Email Template</li>
          <li className={s.listItem}> Set Values</li>
          <li className={s.listItem}> Preview and Send</li>
        </ol>
      </div>
      <div className={s.titleWrapper}>
        <h2 className={s.title}>Set Values</h2>
      </div>
      <form className={s.form} onSubmit={handleFormSubmit}>
        {props.bodyArray.map(item => (
          <label key={item} className={s.formLabelWrapper}>
            <h5 className={s.formLabel}>{item}</h5>
            <input
              type="text"
              name={item}
              className={s.formInput}
              required
              value={inputValues[item]}
              onChange={handleChange}
            />
          </label>
        ))}
        <div className={s.formButtonWrapper}>
          <button
            type="submit"
            className={s.backButton}
            onClick={backButtonOnClick}
          >
            <h5 className={s.backButtonTitle}>BACK</h5>
          </button>
          <button type="submit" className={s.setButton}>
            <h5 className={s.setButtonTitle}>PREVIEW</h5>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Values;
