import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import '../stryles/Dashboard.css'
import Spinner from '../components/Spinner'
import GoalForm from '../components/Goalforms'
import GoalItem from '../components/GoalItem'
import { getGoals,reset } from '../features/goals/GoalSlice'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { goals, isLoading,isError,message } = useSelector((state) => state.goals)
  const { user } = useSelector((state) => state.auth)


useEffect(() => {
  if (isError) {
    console.log(message)
  }

  if (!user) {
    navigate('/login')
  } else {
    dispatch(getGoals())
  }

  return () => {
    dispatch(reset())
  }
}, [user, navigate, dispatch, isError, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='dashboard-page'>
      <section className='dashboard-header'>
        <h1>
          Hello, <span className='user-name'>{user?.name}</span>!
        </h1>
        <p className='subtitle'>
          Ready to tackle your goals today? 🎯
        </p>
      </section>

      <section className='dashboard-grid'>
        <div className='card main-card'>
          <div className='card-icon'>🚀</div>
          <h3>Track New Goal</h3>
          <p>
            Stay focused and productive by setting clear objectives.
          </p>
          <button className='btn-primary'>Create Goal</button>
        </div>

        <div className='card stats-card'>
          <p>
            Your progress overview will appear here once you start adding goals.
          </p>
        </div>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard