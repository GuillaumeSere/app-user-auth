import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Valider le lien dans votre mail')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center" style={{border:"1px solid white", paddingBottom:"1rem", borderRadius:"15px"}}>
      <div className="col-6 form-widget">
        <h1 className="header">Authentification</h1>
        <p className="description">Connectez-vous avec votre email</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Votre email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Envoyer</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}