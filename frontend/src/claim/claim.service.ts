import axios from 'axios';
import { Claim } from './claim';

class ClaimService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = process.env.REACT_APP_SERVER_URI+'claims';
    }

    getClaims(): Promise<Claim []> {
        return axios.get(this.URI).then(result => result.data);
    }
    getClaim(id: number): Promise<Claim> {
        return axios.get(this.URI+'/'+id).then(result=>result.data);
    }
    addClaim(c: Claim): Promise<null> {
        return axios.post(this.URI, c).then(result => null);
    }
    updateClaim(c: Claim): Promise<null> {
        return axios.put(this.URI, c).then(result => null);
    }

    deleteClaim(id: number): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }
}

export default new ClaimService();