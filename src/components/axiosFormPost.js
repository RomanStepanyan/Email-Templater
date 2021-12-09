import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './axiosFormPost.css';

const baseUrl = 'https://mock.at.leanylabs.com/email';

const postFormData = payload => {
  axios
    .post(baseUrl, payload)

    .then(res => {
      console.log(res.message);
      if (res.status === 201) {
        toast('Email sent successfully!', {
          className: 'success-toast',
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    })
    .catch(error => {
      console.log(error.message);
      if (error.message) {
        toast('Failed to send email!', {
          className: 'failed-toast',
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    });
};
export default postFormData;
