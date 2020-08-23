import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core';
import styles from './loginStyles.module.css'

const CssTextField = withStyles({
    root: {
      '& .MuiInputBase-input': {
        color: '#90CAF9',
      }
    }
})(TextField);

export const renderField = ({ label, type }) => (
    <div>
      <label>{label}</label>
      <div>
        <CssTextField placeholder={label} type={type} className={styles.infield} />
        
      </div>
    </div>
  );