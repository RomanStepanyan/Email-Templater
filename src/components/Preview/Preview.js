import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import postFormData from '../axiosFormPost';

import s from './Preview.module.css';

const Preview = props => {
  const bodyInput = props.bodyInput;
  const inputValues = props.inputValues;
  const splittedBodyInput = props.splittedBodyInput;

  const navigate = useNavigate();

  const newBodyText = (splittedBodyInput, inputValues) => {
    let C;
    if (splittedBodyInput.length > 0) {
      C = [splittedBodyInput?.map(el => inputValues[el] || el).join(' ')];
    }
    return C;
  };

  const backButtonOnClick = event => {
    event.preventDefault();
    navigate('/values');
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    postFormData({
      to: inputValues['{recipient}'],
      subject: inputValues['{subject}'],
      body: newBodyText(splittedBodyInput, inputValues).toString(),
    });
  };

  return (
    <div className={s.container}>
      <div className={s.listWrapper}>
        <ToastContainer className={s.ToastContainer} />
        <ol className={s.list}>
          <li className={s.listItem}>Compose Email Template</li>
          <li className={s.listItem}> Set Values</li>
          <li className={s.listItem}> Preview and Send</li>
        </ol>
      </div>
      <div className={s.titleWrapper}>
        <h2 className={s.title}>Preview and Send</h2>
      </div>
      <form className={s.form} onSubmit={handleFormSubmit}>
        {props.initialState.map(item => (
          <label key={item} className={s.formLabelWrapper}>
            <h5 className={s.formLabel}>{item.slice(1, -1)}</h5>
            <input
              type="text"
              name={item}
              className={s.formInput}
              placeholder={item}
              value={inputValues[item].toString()}
              readOnly
            />
          </label>
        ))}

        <label className={s.formLabelWrapper}>
          <h5 className={s.formLabel}>Body</h5>
          <textarea
            name="body"
            cols="40"
            rows="5"
            className={s.formInputBody}
            placeholder="Please add the message"
            value={newBodyText(splittedBodyInput, inputValues).toString()}
            readOnly
          />
        </label>
        <div className={s.formButtonWrapper}>
          <button
            type="submit"
            className={s.backButton}
            onClick={backButtonOnClick}
          >
            <h5 className={s.backButtonTitle}>BACK</h5>
          </button>
          <button type="submit" className={s.setButton}>
            <h5 className={s.setButtonTitle}>SEND</h5>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Preview;
