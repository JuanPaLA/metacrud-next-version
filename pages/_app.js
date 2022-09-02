import '../styles/globals.css'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <main className='main'>
    <Layout>
        <Component {...pageProps} />
    </Layout>
    </main>
  )
}

export default MyApp
