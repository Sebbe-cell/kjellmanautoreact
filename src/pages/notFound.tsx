import '../css/notFound.css'
import notFound from '../assets/404.jpg'
import { routePaths } from '../utils/routePaths'
import { Link } from 'react-router-dom'

const NotFound = (): JSX.Element => (
    <div className="not-found">
        <div className="not-found-container">
            <div>
                <h2>404 - Sidan hittades inte</h2>
                <p>Sidan du letar efter kunde ej hittas</p>
                <Link to={routePaths.home}>Tillbaka hem</Link>
            </div>
            <div>
                <img alt="notfound" src={notFound} />
            </div>
        </div>
    </div>
)

export default NotFound
