'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import styles from './main.module.css'

export default function Main() {
  const router = useRouter()
  const isAuthorized = true // TODO Take authorization from state
  const userName = 'Вася' //TODO Take user name from state

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className={styles.mainContainer}>
      {isAuthorized ? (
        <>
          <h1>Wellcome back, {userName}!</h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate('/rest')}>Rest</Button>
            <Button onClick={() => handleNavigate('/graphiql')}>
              GraphiQL
            </Button>
            <Button onClick={() => handleNavigate('/history')}>History</Button>
          </div>
        </>
      ) : (
        <>
          <h1>Wellcome to REST/GraphiQL Client</h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate('/login')}>Sign in</Button>
            <Button onClick={() => handleNavigate('/signup')}>Sign up</Button>
          </div>
        </>
      )}
    </div>
  )
}
