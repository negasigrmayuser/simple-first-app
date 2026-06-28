import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createGoal, reset } from '../features/goals/goalSlice'; // Assuming a goalSlice
import Spinner from './Spinner';
import '../styles/GoalForm.css'; // Assuming a new CSS file for styling

function GoalForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { goals,isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.goals // Assuming 'goals' is the name of your goalSlice reducer
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // On successful goal creation, clear the form and reset state
    if (isSuccess) {
      toast.success('Goal created successfully!');
      setText(''); 
      dispatch(reset());
      // Clear the input field
    }
   
   
  }, [isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error('Please add a goal description');
      return;
    }

    dispatch(createGoal({ text }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="form-container">
      <section className="heading">
        <h2>Set a New Goal</h2>
        <p>What do you want to achieve next? 🚀</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="goalText">Goal Description</label>
            <input
              type="text"
              id="goalText"
              name="goalText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Learn React Native"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-create-goal">
              Add Goal
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default GoalForm;