import { useNavigate } from 'react-router-dom';

import s from './FirstPage.module.css';

const FirsPage = props => {
  let navigate = useNavigate();

  const handleChange = ({ target }) => {
    props.setBodyInput(target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const bodyVariables = [];
    const bodyText = [];

    const newSplit = props.bodyInput.match(/[^\s,.:;!?\n]+|[.,:;!?\n]/g);
    // const newSplit = props.bodyInput.match(/[^\s,.:;!?\n]+|[.,:;!?\n]/g);

    if (newSplit && props.bodyArray) {
      newSplit.map(item => {
        const splittedItem = item.split(' ', 1);
        if (/^[{][a-zA-Z]*[}]$/.test(splittedItem)) {
          bodyText.push(...splittedItem);
        }

        const notNewVariables = !!props.bodyArray.find(
          variable => variable.toString() === splittedItem.toString(),
        );
        const inBodyVariables = !!bodyVariables.find(
          variable => variable.toString() === splittedItem.toString(),
        );

        if (
          /^[{][a-zA-Z]*[}]$/.test(splittedItem) &&
          !notNewVariables &&
          !inBodyVariables
        ) {
          bodyVariables.push(...splittedItem);
        }
      });

      props.setBodyArray([...props.bodyArray, ...bodyVariables]);
      props.setSplittedBodyInput([...bodyText]);

      navigate('/values');
    }
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
        <h2 className={s.title}>Compose Email Template</h2>
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
              value={item}
              onChange={handleChange}
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
            required
            placeholder="Please add the message"
            value={props.bodyInput.toString()}
            onChange={handleChange}
            pattern="/^[{][a-zA-Z]*[}]/"
            title="The variable can only consist of letters without apostrophes, dashes, spaces etc. For example {name}, but not {name,}"
          />
        </label>
        <button type="submit" className={s.setButton}>
          <h5 className={s.setButtonTitle}>SET VARIABLES</h5>
        </button>
      </form>
    </div>
  );
};
export default FirsPage;
