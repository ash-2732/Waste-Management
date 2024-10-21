import Layout from "../components/Layout/Layout"
import { useAuth } from "../context/Auth"

function Contact() {

  const [auth ] = useAuth();
  return (
    <Layout title={'Contact-Waste Management'}>
      <h1>This is ContactPage</h1>
      <pre>{JSON.stringify(auth , null , 4)}</pre>
    </Layout>
  )
}

export default Contact
